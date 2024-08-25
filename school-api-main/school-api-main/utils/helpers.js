// Function to calculate the distance between two coordinates

function distanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
  const R = 6371.0; // Radius of the Earth in kilometers
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((R * c).toFixed(2)); // Distance in kilometers
}


// Function to calculate and sort distances between pairs of coordinates

function calculateAndSortByDistance(user, schools) {
  const schoolDistances = schools.map(school => {
    const { latitude, longitude } = school;
    return {
      ...school,
      distance: distanceBetweenCoordinates(user.userLat, user.userLon, latitude, longitude)
    };
  });

  // Sort schools in ascending order of distance
  schoolDistances.sort((a, b) => a.distance - b.distance)
  const sortedSchools = schoolDistances.map(el => {
    const { distance, ...rest } = el
    return rest
  })
  return sortedSchools;
}


const schools = [
  {
    "id": 1,
    "name": "Boys' High School & College",
    "address": "Purushottamdas Tandon Marg, Civil Lines, Prayagraj",
    "latitude": 25.4615382,
    "longitude": 81.8403292
  },
  {
    "id": 2,
    "name": "Jagat Taran Golden Jubilee School",
    "address": "Hamilton Road, George Town, Prayagraj",
    "latitude": 25.4539878,
    "longitude": 81.8589719
  },
  {
    "id": 3,
    "name": "St. Joseph's INTER COLLEGE",
    "address": "2, Tashkent Marg, Civil Lines, Prayagraj",
    "latitude": 25.4553288,
    "longitude": 81.8451066
  }
]

export { distanceBetweenCoordinates, calculateAndSortByDistance }