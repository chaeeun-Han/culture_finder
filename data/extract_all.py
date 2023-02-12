import pandas as pd
import googlemaps


googlemaps_key = ""
gmaps = googlemaps.Client(key=googlemaps_key)

df = pd.read_csv(
    r"C:\Users\joonb\Desktop\python\health_finder\cultureFacility.csv")
latitude = []
longitude = []
error_addresses = []


for index, row in df.iterrows():
    address = df['주소'].iloc[index]
    results = gmaps.geocode(address)

    if results:
        geolocation = results[0].get('geometry')
        lat = geolocation['location']['lat']
        lng = geolocation['location']['lng']
        latitude.append(lat)
        longitude.append(lng)
    else:
        error_addresses.append((address, index))
        latitude.append(None)
        longitude.append(None)

if error_addresses:
    error_df = pd.DataFrame(error_addresses, columns=['Address', 'Index'])
    error_df.to_csv('error_addresses.csv', index=False)

df['latitude'] = latitude
df['longitude'] = longitude

df.to_csv("extracted_lat_lon.csv", index=False)
