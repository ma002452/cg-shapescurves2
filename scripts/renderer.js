class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }










    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        let point_a = {x:  50, y:  50};
        let point_b = {x: 100, y: 250};
        let point_c = {x: 300, y: 500};
        let point_d = {x: 400, y: 150};
        this.drawBezierCurve(point_a, point_b, point_c, point_d, this.num_curve_sections, [252, 180, 30, 255], framebuffer);
        if (this.show_points) {
            let startPoint = point_a;
            let t = 1/this.num_curve_sections;
            while (t<=1) {
                let nextPoint = {x: this.BezierCurveX(point_a, point_b, point_c, point_d, t), y: this.BezierCurveY(point_a, point_b, point_c, point_d, t)};
                this.drawVertex(startPoint, [137, 80, 250, 255], framebuffer);
                startPoint = nextPoint;
                t+=1/this.num_curve_sections;
            }

            this.drawControlVertex(point_b, [250, 80, 244, 255], framebuffer);
            this.drawControlVertex(point_c, [250, 80, 244, 255], framebuffer);
            this.drawVertex(point_d, [137, 80, 250, 255], framebuffer);
        }

        let point_e = {x: 100, y: 100};
        let point_f = {x: 180, y: 250};
        let point_g = {x: 550, y: 500};
        let point_h = {x: 600, y: 300};
        this.drawBezierCurve(point_e, point_f, point_g, point_h, this.num_curve_sections, [48, 62, 252, 255], framebuffer);
        if (this.show_points) {
            let startPoint = point_e;
            let t = 1/this.num_curve_sections;
            while (t<=1) {
                let nextPoint = {x: this.BezierCurveX(point_e, point_f, point_g, point_h, t), y: this.BezierCurveY(point_e, point_f, point_g, point_h, t)};
                this.drawVertex(startPoint, [137, 80, 250, 255], framebuffer);
                startPoint = nextPoint;
                t+=1/this.num_curve_sections;
            }

            this.drawControlVertex(point_f, [250, 80, 244, 255], framebuffer);
            this.drawControlVertex(point_g, [250, 80, 244, 255], framebuffer);
            this.drawVertex(point_h, [137, 80, 250, 255], framebuffer);
        }

        // Following line is example of drawing a single line
        // (this should be removed after you implement the curve)
        //this.drawLine({x: 100, y: 100}, {x: 600, y: 300}, [255, 0, 0, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        let center_a = {x: 250, y: 250};
        let radius_a = 100;
        this.drawCircle(center_a, radius_a, this.num_curve_sections, [252, 180, 30, 255], framebuffer);
        if (this.show_points) {
            for (let angle=0; angle<2*Math.PI; angle+=2*Math.PI/this.num_curve_sections) {
                let point = {x: Math.round(center_a.x + radius_a * Math.cos(angle)), y: Math.round(center_a.y + radius_a * Math.sin(angle))};
                this.drawVertex(point, [137, 80, 250, 255], framebuffer);
            }
        }

        let center_b = {x: 500, y: 500};
        let radius_b = 70;
        this.drawCircle(center_b, radius_b, this.num_curve_sections, [48, 62, 252, 255], framebuffer);
        if (this.show_points) {
            for (let angle=0; angle<2*Math.PI; angle+=2*Math.PI/this.num_curve_sections) {
                let point = {x: Math.round(center_b.x + radius_b * Math.cos(angle)), y: Math.round(center_b.y + radius_b * Math.sin(angle))};
                this.drawVertex(point, [137, 80, 250, 255], framebuffer);
            }
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        let point_a = {x:  20, y:  20};
        let point_b = {x:  40, y: 170};
        let point_c = {x: 200, y: 250};
        let point_d = {x: 170, y: 100};
        let point_e = {x:  80, y:  30};
        this.drawConvexPolygon([point_a, point_b, point_c, point_d, point_e], [252, 180, 30, 255], framebuffer);
        if (this.show_points) {
            this.drawVertex(point_a, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_b, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_c, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_d, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_e, [137, 80, 250, 255], framebuffer);
        }

        let point_f = {x: 250, y: 250};
        let point_g = {x: 200, y: 370};
        let point_h = {x: 450, y: 500};
        let point_i = {x: 650, y: 500};
        let point_j = {x: 600, y: 270};
        let point_k = {x: 450, y: 100};
        this.drawConvexPolygon([point_f, point_g, point_h, point_i, point_j, point_k], [48, 62, 252, 255], framebuffer);
        if (this.show_points) {
            this.drawVertex(point_f, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_g, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_h, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_i, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_j, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_k, [137, 80, 250, 255], framebuffer);
        }

        // Following lines are example of drawing a single triangle
        // (this should be removed after you implement the polygon)
        //let point_a = {x:  80, y:  40};
        //let point_b = {x: 320, y: 160};
        //let point_c = {x: 240, y: 360};
        //this.drawTriangle(point_a, point_c, point_b, [0, 128, 128, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        this.drawLine({x:  50, y: 450}, {x: 130, y: 350}, [69, 214, 81, 255], framebuffer);
        this.drawLine({x: 210, y: 450}, {x: 130, y: 350}, [69, 214, 81, 255], framebuffer);
        this.drawLine({x: 130, y: 350}, {x: 130, y: 200}, [69, 214, 81, 255], framebuffer);
        if (this.show_points) {
            this.drawVertex({x:  50, y: 450}, [137, 80, 250, 255], framebuffer);
            this.drawVertex({x: 130, y: 350}, [137, 80, 250, 255], framebuffer);
            this.drawVertex({x: 210, y: 450}, [137, 80, 250, 255], framebuffer);
            this.drawVertex({x: 130, y: 200}, [137, 80, 250, 255], framebuffer);
        }

        let point_a = {x: 230, y: 300};
        let point_b = {x: 260, y: 330};
        let point_c = {x: 310, y: 330};
        let point_d = {x: 340, y: 300};
        let point_e = {x: 310, y: 270};
        let point_f = {x: 260, y: 270};
        this.drawConvexPolygon([point_a, point_b, point_c, point_d, point_e, point_f], [69, 214, 81, 255], framebuffer);
        if (this.show_points) {
            this.drawVertex(point_a, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_b, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_c, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_d, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_e, [137, 80, 250, 255], framebuffer);
            this.drawVertex(point_f, [137, 80, 250, 255], framebuffer);
        }

        let point_g = {x: 230, y: 300};
        let point_h = {x: 200, y: 200};
        let point_i = {x: 320, y: 160};
        let point_j = {x: 340, y: 260};
        this.drawBezierCurve(point_g, point_h, point_i, point_j, this.num_curve_sections, [69, 214, 81, 255], framebuffer);
        if (this.show_points) {
            let startPoint = point_g;
            let t = 1/this.num_curve_sections;
            while (t<=1) {
                let nextPoint = {x: this.BezierCurveX(point_g, point_h, point_i, point_j, t), y: this.BezierCurveY(point_g, point_h, point_i, point_j, t)};
                this.drawVertex(startPoint, [137, 80, 250, 255], framebuffer);
                startPoint = nextPoint;
                t+=1/this.num_curve_sections;
            }

            this.drawControlVertex(point_h, [250, 80, 244, 255], framebuffer);
            this.drawControlVertex(point_i, [250, 80, 244, 255], framebuffer);
            this.drawVertex(point_j, [137, 80, 250, 255], framebuffer);
        }
    
        let center = {x: 450, y: 265};
        let radius = 55;
        this.drawCircle(center, radius, this.num_curve_sections, [69, 214, 81, 255], framebuffer);
        if (this.show_points) {
            for (let angle=0; angle<2*Math.PI; angle+=2*Math.PI/this.num_curve_sections) {
                let point = {x: Math.round(center.x + radius * Math.cos(angle)), y: Math.round(center.y + radius * Math.sin(angle))};
                this.drawVertex(point, [137, 80, 250, 255], framebuffer);
            }
        }

        this.drawLine({x: 570, y: 325}, {x: 570, y: 210}, [69, 214, 81, 255], framebuffer);
        this.drawLine({x: 570, y: 290}, {x: 640, y: 290}, [69, 214, 81, 255], framebuffer);
        this.drawLine({x: 640, y: 210}, {x: 640, y: 290}, [69, 214, 81, 255], framebuffer);
        if (this.show_points) {
            this.drawVertex({x: 570, y: 325}, [137, 80, 250, 255], framebuffer);
            this.drawVertex({x: 570, y: 210}, [137, 80, 250, 255], framebuffer);
            this.drawVertex({x: 570, y: 290}, [137, 80, 250, 255], framebuffer);
            this.drawVertex({x: 640, y: 290}, [137, 80, 250, 255], framebuffer);
            this.drawVertex({x: 640, y: 210}, [137, 80, 250, 255], framebuffer);
        }
    }










    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        let startPoint = p0;
        let t = 1/num_edges;
        while (t<=1) {
            let nextPoint = {x: this.BezierCurveX(p0, p1, p2, p3, t), y: this.BezierCurveY(p0, p1, p2, p3, t)};
            this.drawLine(startPoint, nextPoint, color, framebuffer);
            startPoint = nextPoint;
            t+=1/num_edges;
        }
    }

    BezierCurveX (p0, p1, p2, p3, t) {
        let x = Math.pow(1-t,3) * p0.x + 3 * Math.pow(1-t,2) * t * p1.x + 3 * (1-t) * Math.pow(t,2) * p2.x + Math.pow(t,3) * p3.x;
        return Math.round(x);
    }
    BezierCurveY (p0, p1, p2, p3, t) {
        let y = Math.pow(1-t,3) * p0.y + 3 * Math.pow(1-t,2) * t * p1.y + 3 * (1-t) * Math.pow(t,2) * p2.y + Math.pow(t,3) * p3.y;
        return Math.round(y);
    }










    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        for (let angle=0; angle<2*Math.PI; angle+=2*Math.PI/num_edges) {
            let startPoint = {x: Math.round(center.x + radius * Math.cos(angle)), y: Math.round(center.y + radius * Math.sin(angle))};
            let nextPoint = {x: Math.round(center.x + radius * Math.cos(angle+2*Math.PI/num_edges)), y: Math.round(center.y + radius * Math.sin(angle+2*Math.PI/num_edges))};
            this.drawLine(startPoint, nextPoint, color, framebuffer);
        }
    }










    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        for (let n=1; n<vertex_list.length-1; n++) {
            this.drawTriangle(vertex_list[0], vertex_list[n], vertex_list[n+1], color, framebuffer);
        }
    }
    









    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        let point_a = {x: v.x-5, y: v.y+5};
        let point_b = {x: v.x+5, y: v.y+5};
        let point_c = {x: v.x+5, y: v.y-5};
        let point_d = {x: v.x-5, y: v.y-5};
        
        this.drawLine(point_a, point_b, color, framebuffer);
        this.drawLine(point_b, point_c, color, framebuffer);
        this.drawLine(point_c, point_d, color, framebuffer);
        this.drawLine(point_d, point_a, color, framebuffer);
    }
    
    drawControlVertex(v, color, framebuffer) {
        let point_a = {x: v.x-5, y: v.y+5};
        let point_b = {x: v.x+5, y: v.y+5};
        let point_c = {x: v.x+5, y: v.y-5};
        let point_d = {x: v.x-5, y: v.y-5};
        
        this.drawLine(point_a, point_c, color, framebuffer);
        this.drawLine(point_b, point_d, color, framebuffer);
    }
    









    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
