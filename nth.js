$(document).ready(function() {
  var cells_limit = 360;
  var sinp = $('#series_input');
  sinp.on('keyup paste', initiate);

  function initiate() {
    refreshCells();
    var series = filter_sinp();
    if (series.length > 2) {
      /* Check for Arithmetic Progression */
      if (checkForAP(series)) {
        /* Nth Term: Dn + (A-D) or term1 + term2 */
        var A = series[0];
        var D = series[1] - series[0];
        /* Calculate term1 */
        if (D == 0) {
          var term1 = '';
        }
        else if (D == 1) {
          var term1 = 'n';
        }
        else {
          var term1 = String(D) + 'n';
        }
        /* Calculate term2 */
        if (A == D) {
          var term2 = '';
        }
        else {
          var operator = (A > D)? ' + ' : ' - ';
          var term2 = operator + String(Math.abs(A - D));
        }

        var nth_term = term1 + term2;
        $('#nth_term').text(nth_term);
        smiley('happy');
        highlightCells(A, D);
      }
      else {
        $('#nth_term').text('NONE');
        smiley('sad');
      }
    }
    else if (series.length <= 2) {
      $('#nth_term').text('NONE');
      smiley('poker');
    }
  }
  function filter_sinp() {
    var sinp_list = sinp.val().split(',');
    var series = [];
    for (var i = 0; i < sinp_list.length; i++) {
      if ($.isNumeric(sinp_list[i])) {
        series.push(parseInt(sinp_list[i]));
      }
    }
    return series;
  }
  function checkForAP(series) {
    var len = series.length;
    var diff = series[len-1] - series[len-2];
    for (var i = len-2; i > 0; i--) {
      if (diff != series[i] - series[i-1] || diff < 0) {
        return false;
      }
      diff = series[i] - series[i-1];
    }
    return true;
  }
  function smiley(mood) {
    if (mood == 'happy')
      $('#smiley').text(': )')
    else if (mood == 'sad')
      $('#smiley').text(': (');
    else if (mood == 'poker')
      $('#smiley').text(': |');
  }
  function highlightCells(A, D) {
    for (var i = A; i <= cells_limit; i += D) {
      cell = '#cell_' + String(i);
      $(cell).css({
        'border': '1px solid #ffff00',
        'background-color': '#ffff00',
        'color': '#000000'
      });
    }
  }
  function refreshCells() {
    for (var i = 1; i <= cells_limit; i++) {
      cell = '#cell_' + String(i);
      $(cell).css({
        'border': '1px solid #cfd8dc',
        'background-color': '#fafafa',
        'color': '#607d8b'
      });
    }
  }
});
