$(() => {
  window.propertyListing = {};
  
  function createListing(property, isReservation, user) {
    return `
    <article class="property-listing">
        <section class="property-listing__preview-image">
          <img src="${property.thumbnail_photo_url}" alt="house">
        </section>
        <section class="property-listing__details">
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
            <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
            <li>parking_spaces: ${property.parking_spaces}</li>
          </ul>
          ${isReservation ? 
            `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>` 
            : ``}
          <footer class="property-listing__footer">
          ${user ? `
          <form style="display: flex; flex-direction: column;" method='POST' action>
          <div style="display: flex; justify-content: space-between;">
            <div style="display: flex; flex-direction: column; width: 47%;">
              <label>start date</label>
              <input type="date" id="start" name="res-start"
              value="2022-02-10" min="2022-02-20">
            </div>
            <div style="display: flex; flex-direction: column; width: 47%;">
              <label>end date</label>
              <input type="date" id="end" name="res-end"
              value="2022-02-10" min="2022-02-21">
            </div>
          </div>
            <button style="margin: 0 auto; display: block;">make reservation</button>
          </form>
          ` : ''}
            <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
          </footer>
        </section>
      </article>
    `
  }

  window.propertyListing.createListing = createListing;

});