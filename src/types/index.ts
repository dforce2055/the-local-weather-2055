export enum ROUTES_PATH {
  CITY = 'city'
}

export enum CITY_TYPE {
  FEATURE = 'Feature'
}
export enum GEOMETRY_TYPE {
  POINT = 'Point'
}
export interface Geometry {
  type: GEOMETRY_TYPE.POINT
  coordinates: number[]
}
export interface Coordenates {
  lat: number | string
  lng: number | string
}
export interface LocationFeatureApiDto {
  id: number
  place_name: string
  text: string
  type: CITY_TYPE.FEATURE
  geometry?: Geometry
}
export interface LocationUI extends LocationFeatureApiDto {
  city: string
  state: string
  country: string
  coords?: Coordenates
  weatherData?: OpenWeatherDataApiDto
}

// OpenWeather API
export interface OpenWeatherDataApiDto {
  current:         Current;
  daily:           Daily[];
  hourly:          Current[];
  lat:             number;
  lon:             number;
  minutely:        Minutely[];
  timezone:        string;
  timezone_offset: number;
  currentTime?: Date;
}

export interface Current {
  clouds:     number;
  dew_point:  number;
  dt:         number;
  feels_like: number;
  humidity:   number;
  pop?:       number;
  pressure:   number;
  rain?:      Rain;
  sunrise?:   number;
  sunset?:    number;
  temp:       number;
  uvi:        number;
  visibility: number;
  weather:    Weather[];
  wind_deg:   number;
  wind_gust:  number;
  wind_speed: number;
}

export interface Rain {
  '1h': number;
}

export interface Weather {
  description: Description;
  icon:        string;
  id:          number;
  main:        Main;
}

export enum Description {
  BrokenClouds = 'broken clouds',
  ClearSky = 'clear sky',
  FewClouds = 'few clouds',
  LightRain = 'light rain',
  ModerateRain = 'moderate rain',
  OvercastClouds = 'overcast clouds',
  ScatteredClouds = 'scattered clouds',
}

export enum Main {
  Clear = 'Clear',
  Clouds = 'Clouds',
  Rain = 'Rain',
}

export interface Daily {
  clouds:     number;
  dew_point:  number;
  dt:         number;
  feels_like: FeelsLike;
  humidity:   number;
  moon_phase: number;
  moonrise:   number;
  moonset:    number;
  pop:        number;
  pressure:   number;
  rain?:      number;
  sunrise:    number;
  sunset:     number;
  temp:       Temp;
  uvi:        number;
  weather:    Weather[];
  wind_deg:   number;
  wind_gust:  number;
  wind_speed: number;
}

export interface FeelsLike {
  day:   number;
  eve:   number;
  morn:  number;
  night: number;
}

export interface Temp {
  day:   number;
  eve:   number;
  max:   number;
  min:   number;
  morn:  number;
  night: number;
}

export interface Minutely {
  dt:            number;
  precipitation: number;
}
