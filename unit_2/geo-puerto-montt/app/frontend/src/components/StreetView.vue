<script setup>
/* global google */
import { onMounted } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'

const center = { lat: 40.689247, lng: -74.044502 }

onMounted(async () => {
    const loader = new Loader({
        apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
    });

    await loader.load();

    new google.maps.StreetViewPanorama(
        document.getElementById("street-view"),
        {
        position: center,
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
        addressControl: false
        }
    );
    });
    </script>

    <template>
    <div id="street-view" style="width: 100%; height: 500px;"></div>
</template>
