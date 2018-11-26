import React from 'react';
import LostReportCardv2 from './LostReportCardv2';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


export default class LostReportTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {lostReportKeys:[],
					
						loaded:false,
						refreshEvent:true
		}
	}
	
	
	
	componentDidMount() {
		 const _this = this;
		 let theKeys = this.props.resolverContract.methods.getAllLostReportKeys().call();
		 Promise.all([theKeys ]).then(([theKeys]) => {
			_this.setState({
				  lostReportKeys: theKeys,
				  loaded:true
				})
		
		});
	}
  
	
	
   render() {
	    if(!this.state.loaded)
			return <div></div>
		else
		return(
	
	  <div>
			   
				 <GridList 
					spacing={3}
					cellHeight={'auto'}
					cols={3}
					>
						{this.state.lostReportKeys.map( akey => 
						   <GridListTile key={'lost_'+akey}>
						 <LostReportCardv2 
							key={akey}
							//OwnerHydroId={this.state.lostReportKeys[akey]}
							//reportStatus ={this.state.lostReports[akey].status}
							//reportStatusTxt ={this.props.getStatusTxt(this.state.lostReports[akey].status)}
							//petType={this.state.lostPets[akey].petType}
							//name={this.state.lostPets[akey].name}
							//reportStartDate={this.state.lostReports[akey].reportStartDate}
							//sceneDesc={this.state.lostReports[akey].sceneDesc}
							//desc={this.state.lostPets[akey].desc}
							petId={akey}
							//contactName={this.state.lostPets[akey].contactName}
							//contactData={this.state.lostPets[akey].contactData}
							//reward={this.state.lostReports[akey].reward}
							resolverContract={this.props.resolverContract}
							hydroId = {this.props.hydroId}
							getStatusTxt = {this.props.getStatusTxt}
							
						/>
						  </GridListTile>
						  )}
					 </GridList>	 
			  
				</div>
				
		
    )
  }

}

