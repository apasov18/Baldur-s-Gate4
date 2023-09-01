document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

let cellWidth = 0;
let cellHeight = 0;


var app = new Vue({
    el: "#app",
    data: {
        offsetMap: { x: 0, y: 0 },
        isDragMap: false,
        styleMap: {
            width: "2044px",
            height: "2044px",
            left: "0px",
            top: "0px",
            background: "url(./image/map.jpg)"
        },
        styleCell: {
            width: "100px",
            height: "100px",
        },
        rows: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 0, 0, 0, 1, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 2, 0],
            [0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 1, 2, 0],
            [0, 0, 2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 2, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 2, 2, 2, 0, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 2, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 2, 2, 0, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 0, 0, 0, 0],
            [0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 0, 0, 2, 0],
            [0, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 1, 2, 2, 0, 0, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 1, 1, 2, 2, 0, 0, 2, 2, 0],
            [0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0],
            [0, 2, 2, 0, 0, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 0, 0],
            [0, 2, 2, 0, 1, 1, 1, 1, 1, 0, 2, 2, 1, 2, 2, 2, 2, 2, 0, 0],
            [0, 2, 2, 0, 1, 1, 1, 1, 1, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 0, 1, 1, 1, 1, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 2, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0],
            [0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        entities: [
            {
                type: "person",
                position: {
                    x: 6,
                    y: 15
                }
            }
        ],
        path: []
    },
    created() {
        cellWidth = parseInt(this.styleMap.width) / this.rows.length;
        cellHeight = parseInt(this.styleMap.height) / this.rows[0].length;
        this.styleCell = {
            width: cellWidth + "px",
            height: cellHeight + "px",
        }
    },
    methods: {
        MapDown(e) {
            if (e.button != 2) return;

            this.offsetMap.x = e.clientX - parseInt(this.styleMap.left);
            this.offsetMap.y = e.clientY - parseInt(this.styleMap.top);
            this.isDragMap = true;
        },
        MapMove(e) {
            if (!this.isDragMap) return;

            const x = e.clientX - this.offsetMap.x;
            const y = e.clientY - this.offsetMap.y;
            this.styleMap.left = x + "px";
            this.styleMap.top = y + "px";
        },
        MapUp(e) {
            this.isDragMap = false;
        },
        ShowPath(row, column) {
            if (this.rows[row][column] == 0) return;

            let person = this.entities.find(e => e.type = "person");
            let pos = person.position;

            const start = [pos.y, pos.x];
            const end = [row, column];
            this.path = aStar(this.rows, start, end);
        },
        MapClass(row, column) {
            let classStyle = "";
            if (this.rows[row][column] == 1) {
                classStyle += "maxpassable "
            }
            else if (this.rows[row][column] == 2) {
                classStyle += "passable "
            }

            if (this.MapPath(row, column)) {
                classStyle += "path "
            }
            return classStyle;
        },
        MapPath(row, column) {
            let point = this.path.find(p => p.x == row && p.y == column);
            if (point) {
                return true;
            }
            return false;
        },
        EntityStyle(entity) {
            return {
                width: cellWidth + "px",
                height: cellHeight + "px",
                left: entity.position.x * cellWidth + "px",
                top: entity.position.y * cellHeight + "px",
            }
        }
    }
})