/**
 * DatasetController
 *
 * @description :: Server-side logic for managing datasets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  save: function(req, res) {
    res.type('json');

    Dataset.findOne(1).exec(function (err, record) {
      if (err) return res.negotiate(err);

      // need to create record
      if ( !record ) {
        Dataset.create({id: 1, json: req.body.json}).exec(function (err, records) {
          if (err) return res.negotiate(err);

          return res.send(200, {success: true});
        });

      // update records if exists
      } else {
        Dataset.update({id: 1}, {json: req.body.json}).exec(function (err, records) {
          if (err) return res.negotiate(err);

          return res.send(200, {success: true});
        });
      }
    });
  },

  load: function (req, res) {
    res.type('json');

    Dataset.findOne(1).exec(function (err, record) {
      if (err) return res.negotiate(err);

      if ( record ) {
        res.send(200, {
          success: true,
          json: record.json
        });
      } else {
        res.send(200, {
          success: false
        })
      }
    });
  },

  upload: function (req, res) {
    req.file('json').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000
    },function whenDone(err, uploadedFiles) {

      if (err) {
        return res.negotiate(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }

      console.log(uploadedFiles);

    });
  }
};

