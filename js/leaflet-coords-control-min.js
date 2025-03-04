L.Control.coordProjection=L.Control.extend({options:{position:"bottomleft",separator:" | ",zoomLevel:!0,emptyString:" ",lngFirst:!1,numDigits:3,lngFormatter:void 0,latFormatter:void 0,prefix:"",crs:"EPSG4326"},onAdd:function(o){return this._container=L.DomUtil.create("div","leaflet-control-coord-projection"),L.DomEvent.disableClickPropagation(this._container),o.on("mousemove",this._onMouseMove,this),this._container.innerHTML=this.options.emptyString,this._container},onRemove:function(o){o.off("mousemove",this._onMouseMove)},_onMouseMove:function(o){let t=this._projectTo(this.options.crs,o.latlng,this.options.crsProjObject);this.options.crsProjObject||"EPSG4326"!==this.options.crs?(t=L.latLng(t.x,t.y),this.options.numDigits=3):this.options.numDigits=6;let i=this.options.lngFormatter?this.options.lngFormatter(t.lng):L.Util.formatNum(t.lng,this.options.numDigits),n=this.options.latFormatter?this.options.latFormatter(t.lat):L.Util.formatNum(t.lat,this.options.numDigits),r=this.options.lngFirst?i+this.options.separator+n:n+this.options.separator+i,s=(this.options.zoomLevel?"Zoom level: "+o.target.getZoom()+" at ":"")+this.options.prefix+" "+r;this._container.innerHTML=s},_projectTo:function(o,t){let i=[0,0];switch(o){case"EPSG3395":i=L.Projection.Mercator.project(t);break;case"EPSG3857":i=L.Projection.SphericalMercator.project(t);break;default:return t}return i},changeCrs:function(o){this.options.crs=o}}),L.Map.mergeOptions({positionControl:!1}),L.Map.addInitHook(function(){this.options.positionControl&&(this.positionControl=new L.Control.coordProjection,this.addControl(this.positionControl))}),L.control.coordProjection=function(o){return new L.Control.coordProjection(o)};