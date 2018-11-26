import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class ReportHistoryTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {events:[],
			petId:props.petId
					
			
		}
	}
	
	
	formatTimestamp(timestamp){
		var date = new Date(parseInt(timestamp)*1000);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = date.getFullYear();
		var month = months[date.getMonth()];
		var day = ('0' + date.getDate() ).substr(-2);
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		var time = month + ' ' + day + ' ' + year + ', ' + hour + ':' + min + ':' + sec ;
		return time;
	}
	
	
	
	componentDidMount() {
	
		var _this = this;
		var shaPetId = this.props.w3w.web3js.utils.sha3(this.state.petId);
		this.props.resolverContract.getPastEvents('LostReportChanged', 
			{
				filter: {},
				fromBlock: 0, 
				toBlock: 'latest',
				topics: [null,shaPetId]
			}, 
			function(e,l){
				
							
				_this.setState({
					events: l,
				})
			}
		)
	}
  


	  
    
   render() {
    return(
		
		<div>
       
        <Dialog
          open={this.props.open}
		  fullScreen={true}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Report history of Pet ID:"+this.props.petId+", Name: "+this.props.name}
          </DialogTitle>
          <DialogContent>
		  
			<Table>
				<TableHead>
					<TableRow >
						<TableCell>Date</TableCell>
						<TableCell >Status</TableCell>
						<TableCell >Scene Desc</TableCell>
						<TableCell >Claimer</TableCell>
						<TableCell ><MoneyIcon/></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
				
					
						{this.state.events.map( ev => 
							<TableRow key={this.props.petId+'_'+ev.returnValues.date}>
								<TableCell>{this.formatTimestamp(ev.returnValues.date)}</TableCell>
								<TableCell>{this.props.getStatusTxt(ev.returnValues.lostReport.status)}</TableCell>
								<TableCell>{ev.returnValues.lostReport.sceneDesc}</TableCell>
								<TableCell>{ev.returnValues.lostReport.claimerHydroId}</TableCell>
								<TableCell>{ev.returnValues.lostReport.reward}</TableCell>
							</TableRow>
						)}
				</TableBody>
			</Table>
		</DialogContent>
		 <DialogActions>
		  
			<Button onClick={this.props.handleClose} color="primary">
              Close
            </Button>
          
          </DialogActions>
		</Dialog>
		</div>
    )
  }

}

