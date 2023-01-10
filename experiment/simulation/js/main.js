//import cytoscape from "cytoscape";
//import dagre from "cytoscape-dagre";

//cytoscape.use(dagre);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var relation = {
    nodes: [
        //[[1,'white'], [2,'black'], [3,'black'], [4,'white'], [5,'black']],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5,6],
        [1, 2,3,4,5,6,7,8,9],
    ],
    edges: [
        [ [1, 2],[2, 3],[3, 4],[4, 5],[5, 1]],
        [ [1, 2],[2, 3],[3, 4],[4, 5],[5, 6],[6,1]],
        [[1, 2],[2, 3],[3, 4],[4, 5],[5,6],[6,7],[7,8],[8,9],[9,1]],
       
    ],
    bead:[
        [1,0,1,1,0],
        [1,0,0,1,0,1],
        [0,1,1,0,1,0,0,0,1],
    ],
   
};


// number of examples
var i  = getRandomInt(relation.nodes.length)
var clr = [];

var bc=['#F3F4F6','black']
// Create cytoscape nodes
var cy_nodes = relation.nodes[i].map((x) => 
{
    return { data: { id: `${x}`,color: bc[getRandomInt(2)] }};
});

for (let j = 0; j < relation.nodes[i].length; j++) {
    if(cy_nodes[j].data.color=='black'){
        clr.push(1)
    }
    else {
        clr.push(0)
    }
    //clr.push(cy_nodes[j].data.color)
  }

function updatecol(v) {
    if ( v=='1'){
        return "black";
    }
    else {
        return '#F3F4F6';
    }
}

function rotate() {
     setTimeout(function (){ 
        cy2.nodes().positions(function( i, node ){ 
            return { x: node.position('y')*6, y: -1*node.position('x')*0.2 }; 
        }); 
    cy2.fit()},100);
}

var cy_edges = relation.edges[i].map((x) => {
    return {
        data: { id: `${x[0]}-${x[1]}`, source: `${x[0]}`, target: `${x[1]}` }
    };
});

var cy_bead = relation.bead[i];

const observ = document.getElementById("observations");


var cy2 = (window.cy2 = cytoscape({
    container: document.getElementById("cy2"),

    layout: {
        name: "circle"
    },

    style: [
    {
        selector: "node",
        style: {
            content: "",
            "text-opacity": 0.5,
            "text-valign": "center",
            "text-halign": "center",
            "background-color":"data(color)",
        }
    },

    {
        selector: "edge",
        style: {
            "curve-style": "bezier",
            width: 3,
            "line-color": "#9dbaea",
            "target-arrow-color": "#9dbaea"
        }
    },
    {
        selector: "node.white",
        style: {
            "background-color": '#F3F4F6'
        }
    },
    {
        selector: "node.black",
        style: {
            "background-color": "black"
        }
    },
    
    ],

    elements: {
        nodes: cy_nodes,
        edges: cy_edges
    }
}));

cy2.center()




var cy = (window.cy = cytoscape({
    container: document.getElementById("cy"),

    layout: {
        name: "circle"
    },

    style: [
    {
        selector: "node",
        style: {
            content: "",
            "text-opacity": 0.5,
            "text-valign": "center",
            "text-halign": "center",
            "background-color":"data(color)",
        }
    },

    {
        selector: "edge",
        style: {
            "curve-style": "bezier",
            width: 3,
            "line-color": "#9dbaea",
            "target-arrow-color": "#9dbaea"
        }
    },
    {
        selector: "edge.red",
        style: {
            "line-color": "red",
            "target-arrow-color": "red"
        }
    },
    {
        selector: "edge.green",
        style: {
            "line-color": "green",
            "target-arrow-color": "green"
        }
    }
    ],

    elements: {
        nodes: cy_nodes,
        edges: cy_edges
    }
}));

cy.center()



var cstr = clr.join(" ")+' ';
var clrstr = clr.join(" ");
var clrarr=[];
var msg =  "<font size=5 color=black>" + "Original string : "+
"<br>"+"<b>"+cstr+"</b>" +
"<br><br>"+"Current string :"+
"<b>" +"<br>"+clrstr+"</b>" ;

observ.innerHTML = msg

document.querySelector('#rotate').addEventListener('click', function() {
    console.log('clicked rotate');
    clr = clr.slice(-1).concat(clr.slice(0,-1))
    //clrstr = clrstr.substring(2) + clrstr.substring(0, 2);
    clrstr = clr.join(" ")
    msg = "<font size=5 color=black>" + "Original string :"+
    "<br>"+"<b>"+cstr+"</b>" +
    "<br><br>"+"Current string :"+
    "<b>" +"<br>"+clrstr+"</b>" ;
    observ.innerHTML =  msg;
    clrarr = clr.map(updatecol);
    var un = relation.nodes[i].map((x,idx) => 
    {
        return { data: { id: `${x}`,color: clrarr[idx] }};
    });
    console.log(un);
    cy= (window.cy = cytoscape({
        container: document.getElementById("cy"),
        layout: {
            name: "circle"
        },
    
        style: [
        {
            selector: "node",
            style: {
                content: "",
                "text-opacity": 0.5,
                "text-valign": "center",
                "text-halign": "center",
                "background-color":"data(color)",
            }
        },
    
        {
            selector: "edge",
            style: {
                "curve-style": "bezier",
                width: 3,
                "line-color": "#9dbaea",
                "target-arrow-color": "#9dbaea"
            }
        },
        {
            selector: "edge.red",
            style: {
                "line-color": "red",
                "target-arrow-color": "red"
            }
        },
        {
            selector: "edge.green",
            style: {
                "line-color": "green",
                "target-arrow-color": "green"
            }
        }
        ],
    
        elements: {
            nodes: un,
            edges: cy_edges
        }
    }));
    
    cy.center();

    //for (let j = 0; j < clrarr.length; j++) {
        //cy2.nodes('[id = "j"]').style('background-color', clrarr[j]);

    //}


    //cy.$('node')].forEach((node,idx) => {
      //  cy.nodes('[id = "idx+1"]').style('background-color', clrarr[idx]);

    //});

});


document.querySelector('#reflect').addEventListener('click', function() {
    clr = clr.reverse();
    clrstr = clr.join(" ");
    msg = "<font size=5 color=black>" + "Original string :"+
    "<br>"+"<b>"+cstr+"</b>" +
    "<br><br>"+"Current string :"+
    "<b>" +"<br>"+clrstr+"</b>" ;
    observ.innerHTML =  msg;
    clrarr = clr.map(updatecol);
    var un = relation.nodes[i].map((x,idx) => 
    {
        return { data: { id: `${x}`,color: clrarr[idx] }};
    });
    console.log(un);
    cy= (window.cy = cytoscape({
        container: document.getElementById("cy"),
        layout: {
            name: "circle"
        },
    
        style: [
        {
            selector: "node",
            style: {
                content: "",
                "text-opacity": 0.5,
                "text-valign": "center",
                "text-halign": "center",
                "background-color":"data(color)",
            }
        },
    
        {
            selector: "edge",
            style: {
                "curve-style": "bezier",
                width: 3,
                "line-color": "#9dbaea",
                "target-arrow-color": "#9dbaea"
            }
        },
        {
            selector: "edge.red",
            style: {
                "line-color": "red",
                "target-arrow-color": "red"
            }
        },
        {
            selector: "edge.green",
            style: {
                "line-color": "green",
                "target-arrow-color": "green"
            }
        }
        ],
    
        elements: {
            nodes: un,
            edges: cy_edges
        }
    }));
    
    cy.center();


});

document.querySelector('#submit').addEventListener('click', function() {
    console.log('clicked submit');
    if (clrstr==cstr){

        observ.innerHTML = msg + "<br><br>"+"<font size=4 color=green>" +
            "<b>Correct</b>" +
            "</font>" +
            "<br>"+"You have successfully obtained the original string representation";
    }
    else {
        observ.innerHTML = msg +  "<br><br>"+"<font size=4 color=green>" +
            "<b>Wrong</b>" +
            "</font>" +
            "<br>"+"both string representations are not same";
    }
});