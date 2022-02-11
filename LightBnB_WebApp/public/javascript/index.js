$(() => {
  getMyDetails()
  .then(json => {
    // console.log(json)
    let user = json.message ? null : json.user;
    return user;
  })
  .then(user => {
    getAllListings()
    .then(json =>{
      console.log('getAll', user)
      propertyListings.addProperties(json.properties, false, user);
      views_manager.show('listings');
    });

  });

});