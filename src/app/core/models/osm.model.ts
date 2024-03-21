export interface OSM {
    address: Address;
    addresstype: string;
    boundingbox: [string, string, string, string];
    class: string;
    display_name: string;
    importance: number;
    lat: string;
    licence: string;
    lon: string;
    name: string;
    osm_id: number;
    osm_type: string;
    place_id: number;
    place_rank: number;
    type: string;
}

interface Address {
    ISO31662lvl4: string;
    ISO31662lvl6: string;
    country: string;
    country_code: string;
    county: string;
    postcode: string;
    state: string;
    town: string;
}