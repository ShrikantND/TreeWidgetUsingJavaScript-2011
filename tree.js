/*
# Functiions :

1) CREATE_ROOT_NODE(pid,nid,title,iconSrc)
2) CREATE_NODE(pid,nid,title,isFolder,lvl,iconSrc)
3) CREATE_NODE_CONTAINER(parent_id,node_id,title)
4) REMOVE_NODE(id)
5) ON_ICON_CLICK(id)
6) ON_TITLE_CLICK(id)
7) EXPAND_NODE(id);
8) COLLAPSE_NODE(id);


# Function Description:
1) CREATE_ROOT_NODE(pid,nid,title,iconSrc) :
    This function accepts 4 parameters. First parameter is pid. This is id of the div which is defined in html file. To this div all the
    tree nodes will be appended. Next parameter is nid. This the id of the root node. You can use this id to access the root node.
    Third parameter is tile of the root node and last parameter is icon of the root node.

    Ex: CREATE_ROOT_NODE("tree_root","root","RootName","");
        In above example "tree_root" is the id of root defined in html file in which tree is to be shown. "root" is the id of root node.
        "RootName" is the title of the root node.

2) CREATE_NODE(pid,nid,title,isFolder,lvl,iconSrc)
    This function is used to create node. It accepts 6 parameters. Pid is the id of parent node to which you want to add this node.
    nid, title and iconSrc are node id, title of the node and icon of the node respecitively. isFoder parameter has value either 0 or 1. 
    0 indicates that node is folder i.e. it contains one or more child nodes. Parameter 'lvl' indicates level at which you are adding
    tree node. Root node is at zero level. Child of root node will be at level 1 and so on.

    Ex: CREATE_NODE("root","currentNode","Current Node",1,1,"");
        In above example "root" is the id of parent node. So current node will be appended to node with id "root". "currentNode" is
        the id of current node. "Current Node" is title of the current node. 1 indicates that current child has one or more sub
        childs. In this case current node will be shown with + icon. Next 1 indicates level of the current node. Level 1 means this node
        will be added to root node since root node is at level zero. Last argument "" is the icon source and "" indicates that this node
        dont have any icon along with.

3) CREATE_NODE_CONTAINER(parent_id,node_id,title)
    This function is internally called by other functions. It is not necessary for user to understand this.

4) REMOVE_NODE(id)
    REMOVE_NODE is used to remove tree node respectively. Parameter id is id of the node to be deleted.
    Ex: REMOVE_NODE("currentNode");

5) ON_ICON_CLICK(id)
    This function is used to expand or collpase the node with parameter "id" as id.

6) ON_TITLE_CLICK(id)
    This function is called when user clicks on title of the node. After //TODO in this function you can add your code to implement
    the functionality to be shown on title click.

7) EXPAND_NODE(id)
    This function is used to expand tree node with id "id".

8) COLLAPSE_NODE(id)
    This function is used to collpase tree node with id "id".

*/

var FIRST_LVL_LAST_CHILD = "GiveSomeIdYouLike";
var SECOND_LVL_LAST_CHILD = "GiveSomeDifferentIdYouLike";
var CURR_SELECTED_NID = "";

function CREATE_NODE(pid, nid, title, isFolder, lvl, iconSrc) {
    pid = pid + "_Container";
    var divTag = document.createElement("div");
    divTag.id = nid;
    divTag.className = "new_nodeDiv";

    //***********Logic to change upper childs line connector*****************//
    pid_div = document.getElementById(pid);
    if (pid_div.childNodes.length >= 2) {
        parent_last_child_id = pid_div.childNodes[pid_div.childNodes.length - 2].id;
        parent_last_child_td_class = document.getElementById(parent_last_child_id + "_node_icon").className;
        if ((parent_last_child_td_class != "folder_true_plus") && (parent_last_child_td_class != "folder_tree_minus")) {
            document.getElementById(parent_last_child_id + "_node_icon").className = 'folder_false_middle_child';
        }
    } else {
        var temp_id = pid.replace("_Container", "");
        document.getElementById(temp_id + "_node_icon").className = 'folder_true_plus';
    }
    //***********End Logic to change upper childs line connector***********//


    var d_ct = "<table id='" + nid + "_table' class='tbl_class' border=0 cellspacing=0 cellpadding=0><tr align='left' valign='center'><td class='empty_td'>&nbsptd>";

    if (lvl == 2) {
        if (FIRST_LVL_LAST_CHILD == pid) {
            d_ct = d_ct + "<td class='empty_td'>&nbsptd>";
        } else {
            d_ct = d_ct + "<td class='st_line'>&nbsptd>";
        }
    } else if (lvl == 3) {
        if (SECOND_LVL_LAST_CHILD == pid) {
            d_ct = d_ct + "<td class='st_line'>&nbsptd><td class='empty_td'>&nbsptd>";
        } else {
            d_ct = d_ct + "<td class='st_line'>&nbsptd><td class='st_line'>&nbsptd>";
        }
    }

    if (isFolder) {
        d_ct = d_ct + "<td id='" + nid + "_node_icon' class='folder_true_plus' onclick='ON_ICON_CLICK(\"" + nid + "\")'> td>";
    } else {
        d_ct = d_ct + "<td id='" + nid + "_node_icon' class='folder_false_last_child' onclick='ON_ICON_CLICK(\"" + nid + "\")'> td>";
    }

    if (iconSrc == "") {
        d_ct = d_ct + "<td class='no_icon'>td><td class='node_td_class' >" + title + "span>td>tr>table>";
    } else {
        d_ct = d_ct + "<td class='node_icon'><img src='" + iconSrc + "' class='icon'>td><td class='node_title'><span onclick='ON_TITLE_CLICK(\"" +
            nid + "\")' class='unselected_node' id='" + nid + "_lbl'>" + title + "span>td>tr>table>";
    }

    divTag.innerHTML = d_ct;
    document.getElementById(pid).appendChild(divTag);
    CREATE_NODE_CONTAINER(pid, nid + "_Container", "");
    return;
}



function CREATE_ROOT_NODE(pid, nid, title, iconSrc) {
    var divTag = document.createElement("div");
    divTag.id = nid;
    divTag.className = "new_nodeDiv";


    var d_ct = "<table id='" + nid + "_table' class='tbl_class' border=0 cellpadding='0' cellspacing='0'><tr align='left' valign='middle'>";
    d_ct = d_ct + "<td id='" + nid + "_node_icon' class='gg' onclick='ON_ICON_CLICK(\"" + nid + "\")'> td>";
    if (iconSrc == "") {
        d_ct = d_ct + "<td class='no_icon'>td><td class='node_td_class'><span style='margin-top:2px;' onclick='ON_TITLE_CLICK(\"" +
            nid + "\")' id='" + nid + "_lbl' class='unselected_node'>" + title + "span>td>tr>table>";
    } else {
        d_ct = d_ct + "<td class='node_icon'><img src='" + iconSrc + "' class='icon'>td><td class='node_title'><span onclick='ON_TITLE_CLICK(\"" +
            nid + "\")' class='unselected_node' id='" + nid + "_lbl'>" + title + "span>td>tr>table>";
    }
    divTag.innerHTML = d_ct;
    document.getElementById(pid).appendChild(divTag);

    divTag = document.createElement("div");
    divTag.id = nid + "_Container";
    divTag.className = "new_containerDiv";
    document.getElementById(pid).appendChild(divTag);
    return;
}

function CREATE_NODE_CONTAINER(parent_id, node_id, title) {
    var divTag = document.createElement("div");
    divTag.id = node_id;
    divTag.className = "new_containerDiv";
    document.getElementById(parent_id).appendChild(divTag);
    return;
}

function REMOVE_NODE(id) {
    var child_node = document.getElementById(id);
    var child_container = document.getElementById(id + "_Container");
    var parent_id = document.getElementById(id).parentNode.id;
    var parent_node = document.getElementById(parent_id);
    parent_node.removeChild(child_node);
    parent_node.removeChild(child_container);

    if (parent_node.childNodes.length == 0) { //It means parent has no childs; in this case parent icon will be changes
        parent_parent_id = document.getElementById(parent_id).parentNode.id;
        parent_parent_container = document.getElementById(parent_parent_id);
        document.getElementById(parent_id).className = 'new_containerDiv';
        document.getElementById(parent_id).style.display = "none";
        if (parent_parent_container.childNodes.length == 2) {
            parent_id = parent_id.replace("_Container", "");
            document.getElementById(parent_id + "_node_icon").className = 'folder_false_last_child';
        } else {
            parent_id = parent_id.replace("_Container", "");
            if (parent_parent_container.childNodes[parent_parent_container.childNodes.length - 1].id == parent_id) {
                document.getElementById(parent_id + "_node_icon").className = 'folder_false_last_child';
            } else {
                document.getElementById(parent_id + "_node_icon").className = 'folder_false_middle_child';
            }
        }
    } else { //check for last childs node icon class
        last_child = document.getElementById(parent_node.childNodes[parent_node.childNodes.length - 2].id + "_node_icon");
        if ((last_child.className != "folder_true_plus") && (last_child.className != "folder_tree_minus")) {
            last_child.className = 'folder_false_last_child';
        }
    }
    parent_id = parent_id.replace("_Container", "");
    CURR_SELECTED_NID = "";
    ON_TITLE_CLICK(parent_id);
    return;
}

function ON_ICON_CLICK(id) {
    var pid = document.getElementById(CURR_SELECTED_NID).parentNode.id;
    pid = pid.replace("_Container", "");
    mydiv = document.getElementById(id + "_Container"); // alert("id is :"+id+" and div object is:"+mydiv);
    if (mydiv.innerHTML != "") { //this if is only for IE chekcing. in IE it displays empty div. so avoiding it by checking innerHMTL
        if (mydiv.style.display == "inline") {
            mydiv.style.display = "none";
            document.getElementById(id + "_node_icon").className = 'folder_true_plus';
        } else {
            document.getElementById(id + "_node_icon").className = 'folder_true_minus';
            mydiv.style.display = "inline";
        }
    }
    if (id == pid) {
        document.getElementById(CURR_SELECTED_NID + "_lbl").className = "unselected_node";
        CURR_SELECTED_NID = "";
        ON_TITLE_CLICK(id);
    }
    return;
}

function ON_TITLE_CLICK(id) {
    if (CURR_SELECTED_NID != "") {
        if (CURR_SELECTED_NID != id) {
            document.getElementById(CURR_SELECTED_NID + "_lbl").className = "unselected_node";
            CURR_SELECTED_NID = id;
            document.getElementById(CURR_SELECTED_NID + "_lbl").className = "selected_node";
            //TODO: add your code here to perform on title click operation.
        }
    } else {
        CURR_SELECTED_NID = id;
        document.getElementById(CURR_SELECTED_NID + "_lbl").className = "selected_node";
        //TODO: add your code here to perform on title click operation.
    }
    return;
}

function EXPAND_NODE(id) {
    mydiv = document.getElementById(id + "_Container"); //alert("Node id is :"+id+" and div object is:"+mydiv);
    if (mydiv) {
        if (mydiv.style.display != "inline") {
            document.getElementById(id + "_node_icon").className = 'folder_true_minus';
            mydiv.style.display = "inline";
        }
    }
    return;
}

function COLLAPSE_NODE(id) {
    mydiv = document.getElementById(id + "_Container"); // alert("Node id is :"+id+" and div object is:"+mydiv);
    if (mydiv) {
        if (mydiv.style.display != "none") {
            document.getElementById(id + "_node_icon").className = 'folder_true_plus';
            mydiv.style.display = "none";
        }
    }
    return;
}

