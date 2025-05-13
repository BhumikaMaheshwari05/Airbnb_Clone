const axios = require("axios");

module.exports = async function geocode(location) {
    try {
        const res = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: location,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'wanderlust-app/1.0 (your_email@example.com)' // required by Nominatim
            }
        });

        if (res.data.length === 0) return null;

        const place = res.data[0];
        return {
            latitude: parseFloat(place.lat),
            longitude: parseFloat(place.lon)
        };

    } catch (err) {
        console.error("Geocoding error:", err);
        return null;
    }
};
