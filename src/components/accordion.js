import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

export default function AccordionComponent(props) {
  
 const [expanded, setExpanded] = useState(props.expanded)


  return (
    <Accordion  expanded={expanded} sx={{color:'white', backgroundColor:'rgba(255,255,255,0.1)', width: '90%', borderRadius: '20%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setExpanded(!expanded)}
        >
         {props.headline}
        </AccordionSummary>
        <AccordionDetails>
          {props.body}
        </AccordionDetails>
      </Accordion>
  );
}