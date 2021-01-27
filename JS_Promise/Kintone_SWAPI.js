// https://drive.google.com/uc?export=view&id=1MjOrET2Z4oJD0M2WH5yEssA3kJARuPmI

(function () {
  'use strict';
  const SWAPIendpoint = 'https://swapi.dev/api/people/?search=';

  // Star Wars API call
  let getStarWarsCharacterWithPromise = function (SWAPIurl) {
    // Get Character Details
    return new kintone.Promise(function (resolve, reject) {
      kintone.proxy(SWAPIurl, 'GET', {}, {}, function (resp) {
        let jsonResp = JSON.parse(resp).results[0];
        console.log(jsonResp);
        let body = {
          'app': kintone.app.getId(),
          'record': {
            'name': {
              'value': jsonResp.name
            },
            'homeworld': {
              'value': jsonResp.homeworld
            },
            'link':{
              'type': 'LINK',
              'value': jsonResp.url
            }
          }
        }
        kintone.api(kintone.api.url('/k/v1/record', true), 'POST', body, function () {
          console.log('success');
        }, function () {
          console.log('error');
        });
        resolve(jsonResp);
      }, function (err) {
        console.log(err);
        reject(err);
      });
    }).then(function (resp) {
      // Get Homeworld details
      return new kintone.Promise(function (resolve, reject) {
        kintone.proxy(resp.homeworld, 'GET', {}, {}, function (respHomeworld) {
          let jsonResp = JSON.parse(respHomeworld);
          console.log(jsonResp);
          resolve(resp);
        }, function (err) {
          console.log(err);
          reject(err);
        });
      });
    }).then(function (resp) {
      if (resp.species.length !== 0) {
        // Get Species details
        return new kintone.Promise(function (resolve, reject) {
          kintone.proxy(resp.species[0], 'GET', {}, {}, function (respSpecies) {
            let jsonResp = JSON.parse(respSpecies);
            console.log(jsonResp);
            resolve(resp);
          }, function (err) {
            console.log(err);
            reject(err);
          });
        });
      }
    });
  };

  // Create a button on the Kintone Record List page
  kintone.events.on('app.record.index.show', function (event) {
    // Prevent Button Duplication Bug
    if (document.getElementById('button') !== null) {
      return;
    }
    let button = document.createElement('button');
    button.textContent = 'Add a character';
    kintone.app.getHeaderMenuSpaceElement().appendChild(button);
    button.onclick = function () {
      let SWAPIparams = prompt("Which Star Wars character do you want to search for?");
      let SWAPIurl = SWAPIendpoint + SWAPIparams.toUpperCase();
      console.log(SWAPIurl);
      console.log('Start Search');
      getStarWarsCharacterWithPromise(SWAPIurl).then(function () {
        console.log('End Search');
        location.reload();
      });
    };
    return event;
  });
})();