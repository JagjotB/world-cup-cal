#!/usr/bin/env ruby
# frozen_string_literal: true

require "cgi"
require "json"
require "time"

WORLD_CUP_SOURCE = ARGV[0] || "/private/tmp/worldcuply-schedule.html"
FRIENDLIES_SOURCE = ARGV[1] || "/private/tmp/guardian-friendlies.html"

def clean(value)
  CGI.unescapeHTML(value.to_s.gsub(/<[^>]+>/, "").gsub(/\s+/, " ").strip)
end

def import_world_cup(path)
  system("ruby", "scripts/import-worldcuply-schedule.rb", path, exception: true)
  JSON.parse(File.read("data/matches.json"))
end

def parse_friendlies(path)
  html = File.read(path)
  rows = html.scan(%r{<li class="dcr-(?:1vtelzf|18n74t4)">(.*?)</li>}m)
  seen = {}
  rows.map do |row_match|
    row = row_match.first
    start_time = row[/<time dateTime="([^"]+)"/, 1]
    home = clean(row[/<div class="dcr-3l4pru">(.*?)<\/div>/m, 1])
    away = clean(row[/<div class="dcr-rm7qtf">(.*?)<\/div>/m, 1])
    next unless start_time && home.length.positive? && away.length.positive?
    key = "#{start_time}|#{home}|#{away}"
    next if seen[key]

    seen[key] = true

    start_at = Time.iso8601(start_time)
    {
      "homeTeam" => home,
      "awayTeam" => away,
      "stage" => "International Friendly",
      "startTime" => start_at.utc.iso8601,
      "endTime" => (start_at + 2 * 60 * 60).utc.iso8601,
      "timezone" => "Europe/London",
      "stadium" => "Venue TBD",
      "city" => "TBD",
      "country" => "TBD",
      "competition" => "International Friendly",
      "source" => "The Guardian",
      "sourceUrl" => "https://www.theguardian.com/football/friendlies/fixtures",
      "status" => "scheduled"
    }
  end.compact.each_with_index.map do |match, index|
    match.merge(
      "id" => format("friendly-%03d", index + 1),
      "matchNumber" => index + 1
    )
  end
end

world_cup = import_world_cup(WORLD_CUP_SOURCE)
friendlies = parse_friendlies(FRIENDLIES_SOURCE)

raise "Expected World Cup importer to return 104 matches, got #{world_cup.length}" unless world_cup.length == 104
raise "Expected at least 29 friendlies, got #{friendlies.length}" if friendlies.length < 29

matches = friendlies + world_cup
teams = matches.flat_map { |match| [match["homeTeam"], match["awayTeam"]] }
  .reject { |team| team.match?(/Winner|Loser|Group|third/i) }
  .uniq
  .sort
cities = matches.map { |match| match["city"] }.uniq.sort
stadiums = matches.map { |match| match["stadium"] }.uniq.sort

File.write("data/matches.json", JSON.pretty_generate(matches) + "\n")
File.write("data/teams.json", JSON.pretty_generate(teams) + "\n")
File.write("data/cities.json", JSON.pretty_generate(cities) + "\n")
File.write("data/stadiums.json", JSON.pretty_generate(stadiums) + "\n")

puts "Imported #{matches.length} total matches: #{friendlies.length} friendlies and #{world_cup.length} World Cup matches."
