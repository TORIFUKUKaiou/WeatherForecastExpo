require 'json'

jsons = JSON.parse(open('./city.list.json', &:read))

japan_name_list = jsons.select { |j| j['country'] == 'JP' }
                    .select { |j| j['name'].end_with?('-ken', '-fu', '-to', 'Hokkaidō')}
                    .map { |j| j['name'] }
p japan_name_list

original_json_ary = JSON.parse(open('./cities.json', &:read))

result = original_json_ary.map do |j|
  en = j['en']
  if found = japan_name_list.find { |e| e == en.capitalize || e.start_with?(en.capitalize) }
    j['en'] = found
  elsif en == 'hokkaido'
    j['en'] = 'Hokkaidō'
  elsif en == 'tokyo'
    j['en'] = "Tōkyō-to"
  elsif en == 'kyoto'
    j['en'] = "Kyōto-fu"
  elsif en == 'osaka'
    j['en'] = "Ōsaka-fu"
  elsif en == 'hyogo'
    j['en'] = "Hyōgo-ken"
  elsif en == 'kochi'
    j['en'] = "Kōchi-ken"
  elsif en == 'oita'
    j['en'] = "Ōita-ken"
  end
  j
end

p result.select { |j| j['en'].match(/^[a-z].+$/) }

puts JSON.pretty_generate(result, indent: "\t")
