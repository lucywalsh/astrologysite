import json
import unicodedata

def strip_accents(s):
   return ''.join(c for c in unicodedata.normalize('NFD', s)
                  if unicodedata.category(c) != 'Mn')

def createNewCity(city_obj: dict, country_name):
    new_city = {}
    new_city['country'] = country_name
    new_city['country_code'] = city_obj['country']
    city = strip_accents(city_obj['name'])
    new_city['city'] = city
    new_city['city_and_country'] = city + ", " + country_name
    new_city['lat'] = city_obj['lat']
    new_city['lng'] = city_obj['lng']
    return new_city

def find_country(countries, country_code):
    for country in countries:
        if country['code'] == country_code:
            return(country)
    else:
        print('no country found for: ', country_code)
        return {}

def generate():
    cities = json.load(open("../src/data/cities.json"))
    countries = json.load(open("../src/data/countries.json"))
    new_cities = []
    for city_obj in cities:
        country_code = city_obj['country']
        country = find_country(countries, country_code)
        if country == {}:
            break
        new_city = createNewCity(city_obj, country['name'])
        new_cities.append(new_city)
    with open('../src/data/cities_and_countries.json', 'w') as fout:
        json.dump(new_cities, fout)


def main():
    generate()

if __name__ == "__main__":
    main()