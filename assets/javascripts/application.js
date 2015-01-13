var usedSelectors = [];
var categories = [];

function getClassName(){
  var array = availableSelectors();
  var index = _.random(array.length - 1);
  usedSelectors.push(array[index]);
  return array[index];
}

function availableSelectors(){
  diff = _.difference(filteredSelectors(), usedSelectors);
  if(diff.length === 0) {
    usedSelectors = [];
    return availableSelectors();
  }else{
    return diff;
  }
}

function filteredSelectors(){
  if(_.isEmpty(categories)){
    array = _.union(SELECTORS.object, SELECTORS.state, SELECTORS.modifier);
  }else{
    array = [];
    _.each(categories, function(category){
      array = array.concat(SELECTORS[category]);
    });
  }
  return array;
}

$(function(){
  $(".generate").click(function(e){
    e.preventDefault();
    $('pre h2').text('.'+getClassName());
  });
  $(".tag").click(function(e){
    var target = e.currentTarget;
    var category = $(target).data('name');
    $(target).toggleClass('active');
    if(_.contains(categories, category)){
      categories = _.without(categories, category);
    }else{
      categories.push(category);
    }
  });
});
