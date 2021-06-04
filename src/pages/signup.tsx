import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import { useAuth } from '../../auth';


const signup = () => {
    const user = useAuth();

    if (!user){
      return <div>Text</div>
    }


    return(

                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" >
                            News
                        </Typography>
                    </Toolbar>

                </AppBar>
        
    );
}

export default signup;