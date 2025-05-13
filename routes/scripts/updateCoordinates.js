const mongoose = require('mongoose');
const Listing = require('../models/listing');
const geocode = require('../utils/geocode');

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function updateListingsWithCoords() {
    const listings = await Listing.find({ latitude: { $exists: false } });

    for (let listing of listings) {
        console.log(`Geocoding: ${listing.location}`);
        const coords = await geocode(listing.location);

        if (coords) {
            listing.latitude = coords.latitude;
            listing.longitude = coords.longitude;
            await listing.save();
            console.log(`Updated: ${listing.title}`);
        } else {
            console.log(`❌ Could not geocode: ${listing.location}`);
        }
    }

    console.log('✅ Done updating listings.');
    mongoose.connection.close();
}

updateListingsWithCoords();
