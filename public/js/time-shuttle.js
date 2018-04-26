$(function () {
  $('[data-toggle="popover"]').popover();
  $('#pageShuttle').on('click', '.list-group-item', previewPage);
  $('#pageNameInput').keypress((event) => {
    if (event.which == 13) {
      addToShuttle();
    } else {
      $('#pluralNameInput').val(toCamelCase($(this).val()) + "s")
    }
  });
  $('#pageShuttle').on('click', '.deleteIcon', deletePageFromShuttle);

  // $('.list-group-item').hover(() => {
  //   $(this).find('.deleteIcon').removeClass('hiddenIcon');
  // });
})
var pageNames = [];
var deletingFlag = false;

function addToShuttle() {
  var pageName = $('#pageNameInput').val();
  if (pageNames.findIndex((item) => item === pageName) < 0) {
    var itemTemplate = `<button type="button" class="list-group-item list-group-item-action">
    <img src="./image/svg/circle-check.svg" alt="Generated" class="hiddenIcon generatedIndicator">
    <img src="./image/svg/delete.svg" alt="Generated" class="hiddenIcon deleteIcon">
    <data value="${pageName}">${pageName}</data>
  </button>`;
    $('#pageShuttle').append(itemTemplate);
    pageNames.push(pageName);
  }


}

function previewPage() {
  if (!deletingFlag) {
    $('#pageShuttle').find('.list-group-item').removeClass('active');
    $(this).addClass('active');
    var pageName = $(this).find('data').val();
    pageName = "SecInfo" + toPascal(pageName);


    $('#previewIframe').attr('src', `http://localhost:3000/#/main/s/${pageName}/`);
  }

}

function deletePageFromShuttle() {
  deletingFlag = true;
  var thePageItem = $(this).parent();
  thePageItem.hide(500, () => {
    deletingFlag = false;
    pageNames.remove();
    thePageItem.remove();
  });
}

function toLitertal(value) {
  var substrs = value.split("-");
  for (var i = 0; i < substrs.length; i++) {
    substrs[i] = substrs[i].substring(0, 1).toUpperCase() + substrs[i].substring(1);
  }

  return substrs.join(" ");
}

function toPascal(value) {
  return toLitertal(value).replace(new RegExp(" ", "g"), "");
}

function toCamelCase(value) {
  return value.substring(0, 1).toLowerCase() + _toPascalCase(value).substring(1)
}