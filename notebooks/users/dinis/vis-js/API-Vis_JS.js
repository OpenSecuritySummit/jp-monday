 // create an array with nodes
  var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1', shape: 'box'  , fixed: true , x:0, y:0 },
    {id: 2, label: 'Node 2', color: 'blue' , fixed: true , x:-100, y:0},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5},
    {from: 3, to: 3}
  ]);

  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};

  var network = new vis.Network(container, data, options);

  network.on('startStabilizing', function (data) {
      console.log('startStabilizing',data)
  })
  network.on('stabilizationProgress', function (data) {
      console.log('stabilizationProgress',data)
  })
  network.on('stabilizationIterationsDone', function (data) {
      console.log('stabilizationIterationsDone',data)
  })
  network.on('stabilized', function (data) {
      console.log('stabilized',data)
  })


var Api_VisJs, Canvas_Draw,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Canvas_Draw = (function() {
  function Canvas_Draw(context, options) {
    this.text_vertical = bind(this.text_vertical, this);
    this.text_align = bind(this.text_align, this);
    this.text = bind(this.text, this);
    this.rectangle_fill = bind(this.rectangle_fill, this);
    this.rectangle = bind(this.rectangle, this);
    this.line_dash = bind(this.line_dash, this);
    this.line = bind(this.line, this);
    this.gradient = bind(this.gradient, this);
    this.font = bind(this.font, this);
    this.color = bind(this.color, this);
    this.circle = bind(this.circle, this);
    this.box = bind(this.box, this);
    this.arrow = bind(this.arrow, this);
    this.ctx = context;
    this.default_font = (options != null ? options.font : void 0) || 'Arial';
  }

  Canvas_Draw.prototype.arrow = function(x1, y1, x2, y2) {
    var rot;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    rot = -Math.atan2(x1 - x2, y1 - y2) + Math.PI;
    this.ctx.save();
    this.ctx.translate(x2, y2);
    this.ctx.rotate(rot);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-5, -12);
    this.ctx.lineTo(5, -12);
    this.ctx.closePath();
    this.ctx.fill();
    return this.ctx.restore();
  };

  Canvas_Draw.prototype.box = function(x, y, w, h, r) {
    if (w < 2 * r) {
      r = w / 2;
    }
    if (h < 2 * r) {
      r = h / 2;
    }
    this.ctx.beginPath();
    this.ctx.lineWidth = "3";
    this.ctx.moveTo(x + r, y);
    this.ctx.arcTo(x + w, y, x + w, y + h, r);
    this.ctx.arcTo(x + w, y + h, x, y + h, r);
    this.ctx.arcTo(x, y + h, x, y, r);
    this.ctx.arcTo(x, y, x + w, y, r);
    this.ctx.closePath();
    this.ctx.stroke();
    return this;
  };

  Canvas_Draw.prototype.circle = function(x, y, r) {
    this.ctx.strokeStyle = '#294475';
    this.ctx.lineWidth = 40;
    this.ctx.fillStyle = '#A6D5F7';
    this.ctx.circle(x, y, r);
    this.ctx.fill();
    this.ctx.stroke();
    return this;
  };

  Canvas_Draw.prototype.color = function(color) {
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    return this;
  };

  Canvas_Draw.prototype.font = function(font_size, font_type) {
    this.ctx.font = (font_size || 14) + "px " + (font_type || this.default_font);
    return this;
  };

  Canvas_Draw.prototype.gradient = function(x1, y1, x2, y2, color_from, color_to) {
    var grd;
    grd = this.ctx.createLinearGradient(x1, y1, x2, y2);
    grd.addColorStop(0, color_from);
    grd.addColorStop(1, color_to);
    this.ctx.fillStyle = grd;
    return this;
  };

  Canvas_Draw.prototype.line = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    return this;
  };

  Canvas_Draw.prototype.line_dash = function(length) {
    this.ctx.setLineDash([length, length]);
    return this;
  };

  Canvas_Draw.prototype.rectangle = function(from_x, from_y, to_x, to_y) {
    this.ctx.rect(from_x, from_y, to_x, to_y);
    this.ctx.stroke();
    return this;
  };

  Canvas_Draw.prototype.rectangle_fill = function(x1, y1, x2, y2) {
    this.ctx.fillRect(x1, y1, x2, y2);
    this.ctx.stroke();
    return this;
  };

  Canvas_Draw.prototype.text = function(value, x, y) {
    this.ctx.fillText(value, x, y);
    return this;
  };

  Canvas_Draw.prototype.text_align = function(value) {
    this.ctx.textAlign = value;
    return this;
  };

  Canvas_Draw.prototype.text_vertical = function(value, x, y) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(-Math.PI / 2);
    this.ctx.fillText(value, 0, -20);
    this.ctx.restore();
    return this;
  };

  return Canvas_Draw;

})();

Api_VisJs = (function() {
  function Api_VisJs() {
    this.set_Options = bind(this.set_Options, this);
    this.setup = bind(this.setup, this);
    this.move_canvas = bind(this.move_canvas, this);
    this.draw_static_elements = bind(this.draw_static_elements, this);
    this.add_component = bind(this.add_component, this);
    this.set_edge_value = bind(this.set_edge_value, this);
    this.set_node_value = bind(this.set_node_value, this);
    this.move_to = bind(this.move_to, this);
    this.context = bind(this.context, this);
    this.draw = bind(this.draw, this);
    this._canvas_border = 50;
    this.hide_anchor_edges = true;
    this.connection_arrows = '';
    this.rows = ["Genesis", "Custom Built", "Product (+ rental)", "Commodity (+ utility)"];
    this.row_count = this.rows.length;
  }

  Api_VisJs.prototype.add_node = function(node) {
    return network.body.data.nodes.add(node);
  };

  Api_VisJs.prototype.add_edge = function(edge) {
    return network.body.data.edges.add(edge);
  };

  Api_VisJs.prototype.canvas_border = function() {
    return this._canvas_border;
  };

  Api_VisJs.prototype.canvas_height = function() {
    return network.canvas.frame.clientHeight;
  };

  Api_VisJs.prototype.canvas_width = function() {
    return network.canvas.frame.clientWidth;
  };

  Api_VisJs.prototype.draw = function() {
    return new Canvas_Draw(this.context(), {
      font: 'Courier'
    });
  };

  Api_VisJs.prototype.context = function() {
    return network.canvas.getContext();
  };

  Api_VisJs.prototype.edges = function() {
    return network.body.data.edges._data;
  };

  Api_VisJs.prototype.nodes = function() {
    return network.body.data.nodes._data;
  };

  Api_VisJs.prototype.node_set_x_y = function(id, x, y) {
    network.body.data.nodes.update({
      'id': id,
      x: x,
      y: y
    });
    return this;
  };

  Api_VisJs.prototype.node_fixed_x_y = function(id, x, y) {
    network.body.data.nodes.update({
      'id': id,
      x: x,
      y: y,
      fixed: true
    });
    return this;
  };

  Api_VisJs.prototype.remove_node = function(id) {
    network.body.data.nodes.remove(id);
    return this;
  };

  Api_VisJs.prototype.physics_off = function() {
    network.setOptions({
      physics: false
    });
    return this;
  };

  Api_VisJs.prototype.physics_options = function() {
    return network.physics.options;
  };

  Api_VisJs.prototype.move_to = function(position_x, position_y, offset_x, offset_y, scale) {
    var options;
    options = {
      position: {
        x: position_x,
        y: position_x
      },
      offset: {
        x: offset_x,
        y: offset_y
      },
      scale: scale || 1.0
    };
    return network.moveTo(options);
  };

  Api_VisJs.prototype.set_node_value = function(id, key, value) {
    var obj;
    network.body.data.nodes.update((
      obj = {
        'id': id
      },
      obj["" + key] = value,
      obj
    ));
    return this;
  };

  Api_VisJs.prototype.set_edge_value = function(id, key, value) {
    var obj;
    network.body.data.edges.update((
      obj = {
        id: id
      },
      obj["" + key] = value,
      obj
    ));
    return this;
  };

  Api_VisJs.prototype.add_connection = function(from, to, length) {
    var edge;
    edge = {
      from: "" + from,
      to: "" + to,
      smooth: false,
      arrows: this.connection_arrows,
      color: {
        color: 'black'
      },
      length: length || 200
    };
    return this.add_edge(edge);
  };

  Api_VisJs.prototype.add_component = function(label, row, col) {
    var adjustment, anchor_bottom, anchor_top, area_height, area_width, edge_1_id, edge_1_label, edge_1_length, edge_2_id, edge_2_label, edge_2_length, edge_color, edge_dashes, edge_hidden, node_color, node_font, node_id, node_label, node_mass, node_shape, node_size, node_x, node_y;
    if (row == null) {
      row = 1;
    }
    if (col == null) {
      col = 1;
    }
    node_id = "" + label;
    node_label = "" + label;
    node_color = {
      border: 'black',
      background: 'white'
    };
    node_shape = 'dot';
    node_font = {
      size: 20
    };
    node_size = 8;
    node_mass = 1;
    edge_1_label = '';
    edge_2_label = '';
    edge_1_id = "edge_1_" + label;
    edge_2_id = "edge_2_" + label;
    edge_color = {
      color: '#C0C0C0'
    };
    edge_dashes = true;
    edge_hidden = this.hide_anchor_edges;
    anchor_top = "anchor_" + row + "_0";
    anchor_bottom = "anchor_" + row + "_1";
    adjustment = this.canvas_height() / 3;
    area_height = this.canvas_height() - adjustment;
    area_width = this.canvas_width() - this.canvas_width() / this.row_count;
    edge_1_length = area_height * col / 7;
    edge_2_length = area_height * (8 - col) / 7;
    node_x = area_width * row / this.row_count;
    node_y = edge_1_length;
    api_visjs.add_node({
      id: node_id,
      label: node_label,
      shape: node_shape,
      color: node_color,
      mass: node_mass,
      font: node_font,
      size: node_size,
      x: node_x,
      y: node_y
    });
    api_visjs.add_edge({
      id: edge_1_id,
      label: edge_1_label,
      from: anchor_top,
      to: node_id,
      color: edge_color,
      length: edge_1_length,
      hidden: edge_hidden,
      dashes: edge_dashes
    });
    return api_visjs.add_edge({
      id: edge_2_id,
      label: edge_2_label,
      from: anchor_bottom,
      to: node_id,
      color: edge_color,
      length: edge_2_length,
      hidden: edge_hidden,
      dashes: edge_dashes
    });
  };

  Api_VisJs.prototype.add_top_and_bottom_anchor_nodes = function() {
    var i, j, k, node, node_color, node_fixed, node_font, node_hidden, node_id, node_label, node_shape, node_x, node_y, ref, results, split_x, split_x_offset, split_y;
    split_x = (this.canvas_width() - this.canvas_border() * 2) / this.row_count;
    split_x_offset = split_x / 2;
    split_y = this.canvas_height() - this.canvas_border() * 2;
    node_color = 'black';
    node_hidden = this.hide_anchor_edges;
    node_fixed = true;
    node_font = {
      size: 1
    };
    node_label = ' ';
    node_shape = 'circle';
    results = [];
    for (i = k = 1, ref = this.row_count; 1 <= ref ? k <= ref : k >= ref; i = 1 <= ref ? ++k : --k) {
      results.push((function() {
        var l, results1;
        results1 = [];
        for (j = l = 0; l <= 1; j = ++l) {
          node_id = "anchor_" + i + "_" + j;
          node_x = i * split_x - split_x_offset;
          node_y = j * split_y;
          node = {
            id: node_id,
            color: node_color,
            label: node_label,
            shape: node_shape,
            fixed: node_fixed,
            hidden: node_hidden,
            x: node_x,
            y: node_y,
            font: node_font
          };
          results1.push(api_visjs.add_node(node));
        }
        return results1;
      })());
    }
    return results;
  };

  Api_VisJs.prototype.draw_static_elements = function() {
    var height, i, k, ref, width, x, x_delta, x_start;
    width = this.canvas_width() - this.canvas_border() * 2;
    height = this.canvas_height() - this.canvas_border() * 2;
    this.draw().gradient(0, 0, width / 4, 0, "#E0E0E0", "#FFFFFF").rectangle_fill(0, 0, width / 2, height).gradient(width, 0, width - width / 4, 0, "#E0E0E0", "#FFFFFF").rectangle_fill(width / 2, 0, width / 2, height).color('black');
    this.draw().arrow(0, height, 0, 0);
    this.draw().arrow(0, height, width, height);
    if (true) {
      this.draw().font(20).text_vertical("Value Chain", 0, this.canvas_height() / 2);
      this.draw().font(14).text_vertical("Visible", 0, this.canvas_height() / 8);
      this.draw().font(14).text_vertical("Invisible", 0, this.canvas_height() / 1.3);
    }
    x_delta = [0, -60, -80, -60, 0];
    x_start = width / this.row_count;
    this.draw().text_align("left").font('Italic 13');
    for (i = k = 0, ref = this.row_count - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
      x = i * x_start + x_delta[i];
      this.draw().text(this.rows[i], x + 10, height + 20);
      if (i > 0) {
        this.draw().line_dash(2).line(x, 20, x, height + 20).line_dash(0);
      }
    }
    if (true) {
      this.draw().font('Bold 13').text_align("left").text("Uncharted", 10, 20);
      this.draw().font('Bold 13').text_align("right").text("Industrialised", width - 10, 20);
    }
    return typeof this.on_AfterDrawing === "function" ? this.on_AfterDrawing() : void 0;
  };

  Api_VisJs.prototype.move_canvas = function() {
    return this.move_to(0, 0, -this.canvas_width() / 2 + this.canvas_border(), -this.canvas_height() / 2 + this.canvas_border(), 1.0);
  };

  Api_VisJs.prototype.setup = function() {
    this.move_canvas();
    this.set_Options();
    this.add_top_and_bottom_anchor_nodes();
    network.on("beforeDrawing", (function(_this) {
      return function() {
        return _this.draw_static_elements();
      };
    })(this));
    return this;
  };

  Api_VisJs.prototype.set_Options = function() {
    var options;
    options = {
      nodes: {
        font: {
          face: 'Corier',
          vadjust: -50
        }
      },
      layout: {
        randomSeed: 0
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -700,
          centralGravity: 0.00,
          springLength: 50,
          springConstant: 0.0015,
          damping: 0.4,
          avoidOverlap: 0
        },
        maxVelocity: 10,
        minVelocity: 1,
        solver: 'barnesHut',
        timestep: 1.35,
        stabilization: {
          enabled: true,
          iterations: 2000,
          updateInterval: 100
        }
      },
      interaction: {
        dragNodes: true,
        zoomView: false,
        dragView: false
      }
    };
    return network.setOptions(options);
  };

  return Api_VisJs;

})();

window.Api_VisJs = Api_VisJs;

window.api_visjs = new Api_VisJs();

// ---
// generated by coffee-script 1.9.2