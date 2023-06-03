import {Drawer} from "@mui/material"
import { lightBlue } from "@mui/material/colors"


export default function Cart(){
    return (
        <Drawer
        open={true}
        anchor = "right"
        PaperProps={{
            sx: {
                width: 500,
                broderRadius: 2
            }
        }}>
            <h1>Koszyk</h1>
        </Drawer>
    )
}