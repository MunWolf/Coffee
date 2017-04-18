$(document).ready(() => {
  var grid = $('.flowgrid');
  var contents = grid.children('.flowgrid-content');
  contents.hide();

  var gridWidth = grid.width();
  var gridHeight = grid.height();

  contents.each((index, ele) => {
    var element = $(ele);
    ele.switch_content = (name) => {
      var next = grid.find('#' + name);
      element.hide(500, 'linear', () => {
        next.show(500, 'linear');
      });
    };

    var width = parseInt(element.attr('width'));
    var height = parseInt(element.attr('height'));
    var cWidth = parseInt(element.attr('cWidth'));
    var cHeight = parseInt(element.attr('cHeight'));

    var marginX = (gridWidth - (width * cWidth)) / (width + 1);
    var marginY = (gridHeight - (height * cHeight)) / (height + 1);

    element.children().each((iindex, ielement) => {
      ielement = $(ielement);
      var row = parseInt(ielement.attr('row'));
      var column = parseInt(ielement.attr('column'));

      var cspan = parseInt(ielement.attr('cspan') || 1);
      var rspan = parseInt(ielement.attr('rspan') || 1);

      ielement.css({
        top: row * cHeight + (row + 1) * marginY,
        left: column * cWidth + (column + 1) * marginX,
        width: ((cWidth + marginX) * cspan - marginX) + 'px',
        height: ((cHeight + marginY) * rspan - marginY) + 'px'
      });

      var flow = ielement.attr('flow');
      if (flow !== undefined) {
        ielement.click(() => { ele.switch_content(flow); });
      }
    });
  });

  grid.find('#' + grid.attr('start')).show();
});
