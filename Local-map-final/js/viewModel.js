//#######View Model######//

var ViewModel = function() {
    var self = this;  

    this.locationList = ko.observableArray([]);

    initialLocations.forEach(function(locationItem) {
        self.locationList.push(new Location(locationItem));
    });        

    //Filter for searching through map list
    this.filter = ko.observable("");

    this.filteredLocations = ko.computed(function() {
        var filter = self.filter().toLowerCase();
        return ko.utils.arrayFilter(self.locationList(), function(item) {
            var isVisible = item.name.toLowerCase().indexOf(filter) > -1 || !filter;
            item.marker.setVisible(isVisible);
            return isVisible;
        });
    });

};
