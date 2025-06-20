<script lang="ts">
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";

  export let token: string;
  export let onSelect: (data: DeliveryLocation) => void;

  let mapContainer: HTMLDivElement;
  let map: mapboxgl.Map;
  let marker: mapboxgl.Marker;

  interface Coordinates {
    lat: number;
    lng: number;
  }

  // Initial center (Dar es Salaam example)
  const defaultCoords: Coordinates = { lat: -6.163, lng: 35.7516 };

  function setMarker(coords: Coordinates) {
    if (marker) {
      marker.setLngLat([coords.lng, coords.lat]);
    } else {
      marker = new mapboxgl.Marker()
        .setLngLat([coords.lng, coords.lat])
        .addTo(map);
    }
  }

  async function reverseGeocode(lat: number, lng: number) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`;
    const res = await fetch(url);
    const data = await res.json();
    return data?.features?.[0]?.place_name ?? "Unknown location";
  }

  async function handleLocationSelect(coords: Coordinates) {
    setMarker(coords);
    const address = await reverseGeocode(coords.lat, coords.lng);
    onSelect({ lat: coords.lat, lng: coords.lng, address });
  }

  function useMyLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      map.flyTo({ center: [coords.lng, coords.lat], zoom: 16 });
      handleLocationSelect(coords);
    });
  }

  onMount(() => {
    mapboxgl.accessToken = token;

    map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [defaultCoords.lng, defaultCoords.lat],
      zoom: 13,
    });

    map.on("click", (e) => {
      const coords = { lat: e.lngLat.lat, lng: e.lngLat.lng };
      handleLocationSelect(coords);
    });
  });
</script>

<button
  type="button"
  on:click={useMyLocation}
  class="mb-2 p-2 bg-blue-500 text-white rounded"
>
  📍 Use My Current Location
</button>

<div bind:this={mapContainer} class="w-full h-[400px] rounded shadow"></div>
