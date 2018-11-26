import React, { Component } from 'react';
//0x43b927b052475f18b71bd93dc19e51d297c768d9 address contract in rinkeby network

import Typography from '@material-ui/core/Typography';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withWeb3 } from 'web3-webpacked-react';
import LostReportTable from './LostReportTable';
import PetCard from './PetCard';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import EditAccountDialog from './EditAccountDialog';
import Button from '@material-ui/core/Button';
import EditPetDialog from './EditPetDialog';

const reportStatusResources=['Lively', 'Lost', 'Found', 'Removed', 'Rewarded'];

class PetOwnerView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messageStandard: '',
  	  refreshReportList:true,
	  ownerPets:[],
	  openNewPet:false
    }
  }
	
	getStatusTxt(status){
		return reportStatusResources[status];
		
	}

  
  refreshReportList = () => {
	this.setState({refreshReportList: !this.state.refreshReportList});
  }
  
  componentDidMount() {
    this.getOwnerPets();
  }
  
   componentWillReceiveProps(nextProps){
    this.getOwnerPets();
  }

  refreshPets(){
		this.getOwnerPets();
	}
	
	
	handleClickOpenNewPet(){
		this.setState({openNewPet:true});
	}
	
	handleCloseNewPet(){
		this.setState({openNewPet:false});
		this.refreshPets()
	}

   getOwnerPets(){
    this.props.resolverContract.methods.getOwnerPets(this.props.hydroId).call()
    .then(ownerPets =>{
      this.setState(
	      {
		  ownerPets: ownerPets
		 });
    })
  }
  
  
  handleRefreshOwnerData(){
	  //nothing to do
  }
  
  render() {

    return (
	
      <div>
		<ExpansionPanel elevation={3}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant={"title"}>Your Account details</Typography>
          </ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<EditAccountDialog 
						hydroId={this.props.hydroId}
						resolverContract={this.props.resolverContract}
						handleSubmit= {this.handleRefreshOwnerData}
						
				  />
			</ExpansionPanelDetails>
        </ExpansionPanel>
		
        <ExpansionPanel elevation={3} defaultExpanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant={"title"}>Your Pet Details</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{width: '100%'}}>
			
             
			  <div>
			   
				 <GridList 
					spacing={3}
					cellHeight={'auto'}
					cols={3}
					>
						  {this.state.ownerPets.map( aPetId =>
						   <GridListTile key={aPetId}>
						  <PetCard 
								key ={aPetId}
								petId={aPetId}
								//contactName={this.state.contactName}
								//contactData={this.state.contactData}
								resolverContract={this.props.resolverContract} 
								hydroId = {this.props.hydroId}
								refreshPets = {this.refreshPets.bind(this)}
								getStatusTxt = {this.getStatusTxt}
								w3w = {this.props.w3w}
								
										
						  />
						  </GridListTile>
						  )}
					 </GridList>	 
			  
				</div>
				<div>
				<Button variant="outlined" size="medium" color="default" onClick={this.handleClickOpenNewPet.bind(this)}>
				Register New Pet...
				</Button>
				 
				<EditPetDialog 
						hydroId={this.props.hydroId}
						petId={''}
						
						petType={''}
						name={''}
						
						desc={''}
						imgUrl={''}
						//contactName={this.props.contactName}
						//contactData={this.props.contactData}
						onModifyPet={this.onModifyPet}
						open={this.state.openNewPet}
						resolverContract={this.props.resolverContract}
						handleClose={this.handleCloseNewPet.bind(this)}
					/>
				</div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
			
	
		<ExpansionPanel elevation={3}  >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant={"title"}>List of Lost Pets. Have you found any of this? Help Us!</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{width: '100%'}}>
				<LostReportTable 
					resolverContract={this.props.resolverContract} 
					/*refresh={this.state.refreshReportList}*/ 
					key={this.state.refreshReportList} 
					hydroId = {this.props.hydroId}
					getStatusTxt = {this.getStatusTxt}/>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
		
        </div>
    );
  }
}

export { default as logo } from './logo.png'

export const ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "petId",
				"type": "string"
			}
		],
		"name": "unclaimLostReport",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ownerId",
				"type": "string"
			},
			{
				"name": "petId",
				"type": "string"
			},
			{
				"name": "petType",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "desc",
				"type": "string"
			},
			{
				"name": "imgUrl",
				"type": "string"
			}
		],
		"name": "updatePet",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "petId",
				"type": "string"
			}
		],
		"name": "getPetOwner",
		"outputs": [
			{
				"name": "ownerId",
				"type": "string"
			},
			{
				"name": "contactName",
				"type": "string"
			},
			{
				"name": "contactData",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "ownerId",
				"type": "string"
			}
		],
		"name": "getOwnerPets",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "hydroId",
				"type": "string"
			}
		],
		"name": "getOwner",
		"outputs": [
			{
				"name": "contactName",
				"type": "string"
			},
			{
				"name": "contactData",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ownerId",
				"type": "string"
			},
			{
				"name": "petId",
				"type": "string"
			},
			{
				"name": "sceneDesc",
				"type": "string"
			},
			{
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "putLostReport",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllLostReportKeys",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ownerId",
				"type": "string"
			},
			{
				"name": "petId",
				"type": "string"
			}
		],
		"name": "confirmReward",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "petId",
				"type": "string"
			}
		],
		"name": "getLostReport",
		"outputs": [
			{
				"name": "status",
				"type": "uint8"
			},
			{
				"name": "sceneDesc",
				"type": "string"
			},
			{
				"name": "reward",
				"type": "uint256"
			},
			{
				"name": "claimerHydroId",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ownerId",
				"type": "string"
			},
			{
				"name": "petId",
				"type": "string"
			},
			{
				"name": "petType",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "desc",
				"type": "string"
			},
			{
				"name": "imgUrl",
				"type": "string"
			}
		],
		"name": "addPet",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "snowflakeDescription",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "snowflakeName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ownerId",
				"type": "string"
			},
			{
				"name": "petId",
				"type": "string"
			}
		],
		"name": "removeLostReport",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "callOnRemoval",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ownerId",
				"type": "string"
			},
			{
				"name": "petId",
				"type": "string"
			},
			{
				"name": "sceneDesc",
				"type": "string"
			},
			{
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "updateLostReport",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "setSnowflakeAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "petId",
				"type": "string"
			}
		],
		"name": "getPet",
		"outputs": [
			{
				"name": "petType",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "desc",
				"type": "string"
			},
			{
				"name": "imgUrl",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "callOnSignUp",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "hydroId",
				"type": "string"
			},
			{
				"name": "contactName",
				"type": "string"
			},
			{
				"name": "contactData",
				"type": "string"
			}
		],
		"name": "updateOwner",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "snowflakeAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "petId",
				"type": "string"
			},
			{
				"name": "claimerHydroId",
				"type": "string"
			}
		],
		"name": "claimLostReport",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "hydroId",
				"type": "string"
			},
			{
				"name": "allowance",
				"type": "uint256"
			}
		],
		"name": "onSignUp",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "petId",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "date",
				"type": "uint256"
			},
			{
				"components": [
					{
						"name": "petId",
						"type": "string"
					},
					{
						"name": "status",
						"type": "uint8"
					},
					{
						"name": "sceneDesc",
						"type": "string"
					},
					{
						"name": "reward",
						"type": "uint256"
					},
					{
						"name": "claimerHydroId",
						"type": "string"
					}
				],
				"indexed": false,
				"name": "lostReport",
				"type": "tuple"
			}
		],
		"name": "LostReportChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	}
] // eslint-disable-line



export default withWeb3(PetOwnerView);




