export type Weather = "sunny" | "cloudy" | "rainy" | "stormy" | "windy";

export type Visibility = "great" | "good" | "ok" | "poor"; 

export interface Diaries {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export type NewDiary = Omit<Diaries, 'id'>