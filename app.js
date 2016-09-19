var filenames = [  "2015-09-15", "2015-09-20", "2015-10-05", "2015-10-08", "2015-10-27", "2015-10-29","2015-10-31","2015-11-08","2015-11-12", "2015-11-13", "2015-11-14", "2015-11-15","2015-11-25", "2015-11-30", "2015-12-02", "2015-12-03", "2015-12-17", "2015-12-26",  "2015-12-30", "2015-12-31", "2016-01-14", "2016-01-20" ,"2016-01-27", "2016-02-08", "2016-02-27", "2016-02-28", "2016-03-02", "2016-03-06", "2016-03-12", "2016-03-13", "2016-04-06", "2016-04-08", "2016-04-30", "2016-05-08", "2016-05-10", "2016-05-24", "2016-06-01", "2016-06-06", "2016-06-07", "2016-06-21", "2016-06-22", "2016-06-24", "2016-06-26", "2016-06-27", "2016-06-30", "2016-07-01", "2016-07-02", "2016-07-05", "2016-07-07", "2016-07-09", "2016-07-10", "2016-07-14", "2016-07-15", "2016-07-19", "2016-07-20", "2016-07-21", "2016-07-25", "2016-07-28", "2016-07-30", "2016-07-31", "2016-08-04", "2016-08-05", "2016-08-06", "2016-08-07", "2016-08-09", "2016-08-10", "2016-08-11", "2016-08-12", "2016-08-14", "2016-08-15", "2016-08-16", "2016-08-18", "2016-08-19", "2016-08-20", "2016-08-21", "2016-08-22", "2016-08-23", "2016-08-24", "2016-08-27", "2016-08-30", "2016-08-31", "2016-09-01", "2016-09-02", "2016-09-03", "2016-09-04", "2016-09-05", "2016-09-08", "2016-09-09", "2016-09-10", "2016-09-11"],
    images = [],
    colors = [],
    color, 
    rgb = {
        r: 0,
        g: 0,
        b: 0
    },
    dates = [],
    date_index = 0,
    count = 0,
    bg_color = "#e9e9e9";
   

function preload() {
    
    for (var i = 0; i < filenames.length; i++) {
        images[i] = loadImage("/images/" + filenames[i] + ".jpg");
    }
}

function setup() {
   
    var canvas =  createCanvas(500, 3500);
    canvas.parent('box');

    noLoop();
    
    for (var i = 0; i < images.length; i++) {
        images[i].loadPixels();
    }
    
    background(bg_color);
    rectMode(CENTER);
    noStroke();
}


function draw() {
    
    assign_colors(); 
    get_dates();
    
    make_calendar(2015, 9, 12);
    make_calendar(2016, 1, 9);
}


function make_calendar(year, start_month, end_month) {
        for(var month = start_month; month <= end_month; month++) {
        
            var cur_weeks = weekCount(year, month),
            firstOfMonth = new Date(year, month - 1, 1),
            lastOfMonth = new Date(year, month, 0),
            monthStart = firstOfMonth.getDay(),
            monthEnd = lastOfMonth.getDay(),
            day = 0;
    
            translate(100, 100);
        
            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < cur_weeks; j++) {
                    fill('#ffffff');
                
                    if (((j == 0) && (i < monthStart)) || ((j == cur_weeks - 1) && (i > monthEnd))) {
                            fill(bg_color);
                    }
                
                    else {
                        day++;
                        if ((date_index < dates.length) && (day == dates[date_index].d) && (month == dates[date_index].m) && (year == dates[date_index].y)) {
                            fill(colors[date_index]);
                            date_index++;
                        }
                    }
                    push();
                    translate(i * 40, j * 40);
                    rect(i, j, 20, 20);
                    pop();
                }
            }
        
        translate(-100, 150); 
    }          
}


function assign_colors() {
    
    for (var i = 0; i < images.length; i++) {  
        var color = images[i].get((random(1, 50) + ((images[i].width)/2)), (random(1,50) + ((images[i].height)/2)));
        colors.push(color);
    }
}

function get_dates() {    
    for(var i = 0; i < filenames.length; i++) {
        var temp = filenames[i].split("-");
         var date = {
            d: 0,
            m: 0,
            y: 0
            };
        date.d = temp[2];
        date.m = temp[1];
        date.y = temp[0];
        dates.push(date);
    }
}


function weekCount(year, month_number) {

    // month_number is in the range 1..1

    var firstOfMonth = new Date(year, month_number - 1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
}