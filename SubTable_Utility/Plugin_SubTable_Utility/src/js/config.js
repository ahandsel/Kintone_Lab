/*
MIT License
Copyright (c) 2018 Cybozu
https://github.com/kintone/SAMPLE-Table-numbering-plug-in/blob/master/LICENSE
*/

jQuery.noConflict();
(function($, PLUGIN_ID) {
  'use strict';
  // Get configuration settings

  var CONF = kintone.plugin.app.getConfig(PLUGIN_ID);
  var $form = $('.js-submit-settings');
  var $cancelButton = $('.js-cancel-button');
  var $number = $('select[name="js-select-number-field"]');
  var $sortButton = $('select[name="js-select-space-field"]');
  var $sortBy = $('select[name="js-select-sort-by"]');
  var $sortOrder = $('select[name="js-select-order-by"]');

  function escapeHtml(htmlstr) {
    return htmlstr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function setDropDown(dropdownField, fieldType, prop) {
    var $option = $('<option>');

    // Retrieve field information, then set drop-down
    return KintoneConfigHelper.getFields(fieldType)
      .then(function(resp) {
        resp.forEach(function(field) {
          switch (field.type) {
          case 'SPACER':
            $option.attr('value', field.elementId); // Set table code and number field code
            $option.text(escapeHtml(field.elementId));
            dropdownField.append($option.clone());
            // Set default values
            dropdownField.val(CONF[prop]);
            break;
          default:
            if (field.subtableCode) {
              $option.attr('value', field.subtableCode + ',' + field.code); // Set table code and number field code
              $option.text(escapeHtml(field.label));
              dropdownField.append($option.clone());
              // Set default values
              dropdownField.val(CONF.table + ',' + CONF[prop]);
            }
          }
        });
      }, function() {
        return alert('Failed to retrieve field(s) information');
      });
  }
  $(document).ready(function() {
    // Set drop-down list
    setDropDown($number, ['NUMBER'], 'number');
    setDropDown($sortButton, ['SPACER'], 'button');
    setDropDown($sortBy, ['NUMBER', 'SINGLE_LINE_TEXT', 'DATE'], 'sortBy');

    // Set default values
    $sortOrder.val(CONF.sortOrder);

    // Set input values when 'Save' button is clicked
    $form.on('submit', function(e) {
      var config = [];
      var number = $number.val();
      var button = $sortButton.val();
      var sortBy = $sortBy.val();
      var sortOrder = $sortOrder.val();
      e.preventDefault();

      config.table = number.split(',')[0];// Set table field code
      config.number = number.split(',')[1];// Set number field code
      config.button = button;// Set space field code
      config.sortBy = sortBy.split(',')[1]; // Set field to be sorted
      config.sortOrder = sortOrder;// Set sosrt order

      kintone.plugin.app.setConfig(config, function() {
        alert('The plug-in settings have been saved. Please update the app!');
        window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId();
      });
    });
    // Process when 'Cancel' is clicked
    $cancelButton.on('click', function() {
      window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/';
    });
  });
})(jQuery, kintone.$PLUGIN_ID);
