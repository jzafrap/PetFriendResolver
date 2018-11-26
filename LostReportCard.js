import React from 'react';
//0x43b927b052475f18b71bd93dc19e51d297c768d9 address contract in rinkeby network

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MoneyIcon from '@material-ui/icons/AttachMoney';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import PetIcon from '@material-ui/icons/Pets';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';

import ClaimReportDialog from './ClaimReportDialog';



export default class LostReportCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {	
			openReport:false
		}
	}
	
		
	handleClickOpenReport = () => {
		this.setState({ openReport: true });
	};
	
	 handleCloseReport = () => {
		this.setState({ openReport: false });
		//callback for refreshing active report data
		//this.props.getActiveReport();
    
  };
  
  	getStatusColor() {
		if(this.props.reportStatus ==="1")
			return {backgroundColor: red[500]}
		else if(this.props.reportStatus === "2")
			return {backgroundColor: yellow[500]}
		else
			return {backgroundColor: green[500]};
	}
	  
   render() {
    return(
    
	  <Card style={{maxWidth: 400}}>
      <CardActionArea>
	  <CardHeader
          avatar={
		  <Avatar aria-label={this.props.petType} style={this.getStatusColor()}>
			  <PetIcon/>
            </Avatar>
          }
          title={this.props.name+ ' - ' +this.props.petType}
          subheader={'Lost Date: '+this.props.reportStartDate}
        />
        <CardMedia   style={{ height: 0, paddingTop: '56%'}}
          //className={styles.media}
          //image="https://upload.wikimedia.org/wikipedia/commons/d/db/Pet_Discount_Logo.jpg"
		  image ={this.state.imgUrl===''?require ("./noImage.png"):this.state.imgUrl}
          title="pet image"
		/>
        <CardContent>
           <Typography component="p">{'Lost scene: '+this.props.sceneDesc}</Typography>
		  <Typography component="p">{'Pet desc: '+this.props.desc}</Typography>
		  <Typography component="p">Pet ID: {this.props.petId}</Typography>
		  <Typography component="p">Owned by: {this.props.contactName} ({this.props.contactData})</Typography>
		  <Typography component="p"><MoneyIcon/> {this.props.reward +' HYDRO'} </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
	  <div>
        <Button size="small" color="primary"  onClick={this.handleClickOpenReport}>
          Report Pet Found!
        </Button>
		<ClaimReportDialog 
						OwnerHydroId={this.props.OwnerHydroId}
						reportStatus ={this.props.reportStatus}
						reportStatusTxt ={this.props.reportStatusTxt}
						reportStartDate={this.props.reportStartDate}
						reportSceneDescription={this.props.sceneDesc}
						contactName={this.props.contactName}
						contactData={this.props.contactData}
						reportReward={this.props.reward}
						open={this.state.openReport}
						resolverContract={this.props.resolverContract}
						handleClose={this.handleCloseReport}
						hydroId={this.props.hydroId}
						
							
							
			/>
		</div>
        
      </CardActions>
    </Card>
    )
  }

}

