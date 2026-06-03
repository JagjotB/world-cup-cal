#!/usr/bin/env ruby
# frozen_string_literal: true

require "cgi"
require "json"
require "set"
require "time"

SOURCE = ARGV[0] || "/private/tmp/worldcuply-schedule.html"

COUNTRIES = {
  "Atlanta" => "United States",
  "Boston" => "United States",
  "Dallas" => "United States",
  "Houston" => "United States",
  "Kansas City" => "United States",
  "Los Angeles" => "United States",
  "Miami" => "United States",
  "New York / New Jersey" => "United States",
  "Philadelphia" => "United States",
  "San Francisco Bay Area" => "United States",
  "Seattle" => "United States",
  "Toronto" => "Canada",
  "Vancouver" => "Canada",
  "Guadalajara" => "Mexico",
  "Mexico City" => "Mexico",
  "Monterrey" => "Mexico"
}.freeze

TIMEZONES = {
  "Atlanta" => "America/New_York",
  "Boston" => "America/New_York",
  "Dallas" => "America/Chicago",
  "Houston" => "America/Chicago",
  "Kansas City" => "America/Chicago",
  "Los Angeles" => "America/Los_Angeles",
  "Miami" => "America/New_York",
  "New York / New Jersey" => "America/New_York",
  "Philadelphia" => "America/New_York",
  "San Francisco Bay Area" => "America/Los_Angeles",
  "Seattle" => "America/Los_Angeles",
  "Toronto" => "America/Toronto",
  "Vancouver" => "America/Vancouver",
  "Guadalajara" => "America/Mexico_City",
  "Mexico City" => "America/Mexico_City",
  "Monterrey" => "America/Monterrey"
}.freeze

def text(html)
  CGI.unescapeHTML(html.gsub(/<[^>]+>/, "").gsub(/\s+/, " ").strip)
end

html = File.read(SOURCE)
matches = html.scan(%r{<div class="match" id="match-(\d+)">(.*?)</div>\s*</div>}m).map do |number, body|
  teams_html = body[/<div class="teams">(.*?)<\/div>/m, 1]
  teams = teams_html.scan(%r{<span class="tn">(.*?)</span>}m).map { |value| text(value.first) }
  stage = text(body[/<span class="round-badge[^"]*">(.*?)<\/span>/m, 1])
  datetime = body[/<time datetime="([^"]+)"/, 1]
  venue_text = text(body[/<span class="venue">(.*?)<\/span>/m, 1])
  stadium, city = venue_text.split(", ", 2)
  start_time = Time.iso8601(datetime)
  end_time = start_time + (stage =~ /^Group\s/i ? 2 * 60 * 60 : 2.5 * 60 * 60)

  {
    id: format("match-%03d", number.to_i),
    matchNumber: number.to_i,
    homeTeam: teams[0],
    awayTeam: teams[1],
    stage: stage,
    startTime: start_time.utc.iso8601,
    endTime: end_time.utc.iso8601,
    timezone: TIMEZONES.fetch(city),
    stadium: stadium,
    city: city,
    country: COUNTRIES.fetch(city),
    competition: "FIFA World Cup 2026",
    source: "WorldCuply",
    sourceUrl: "https://worldcuply.com/schedule.html",
    status: teams.any? { |team| team.match?(/Winner|Loser|Group|third/i) } ? "placeholder" : "scheduled"
  }
end

raise "Expected 104 matches, got #{matches.length}" unless matches.length == 104

teams = matches.flat_map { |match| [match[:homeTeam], match[:awayTeam]] }
  .reject { |team| team.match?(/Winner|Loser|Group|third/i) }
  .uniq
  .sort
cities = matches.map { |match| match[:city] }.uniq.sort
stadiums = matches.map { |match| match[:stadium] }.uniq.sort

File.write("data/matches.json", JSON.pretty_generate(matches) + "\n")
File.write("data/teams.json", JSON.pretty_generate(teams) + "\n")
File.write("data/cities.json", JSON.pretty_generate(cities) + "\n")
File.write("data/stadiums.json", JSON.pretty_generate(stadiums) + "\n")

puts "Imported #{matches.length} matches, #{teams.length} teams, #{cities.length} cities, #{stadiums.length} stadiums."
