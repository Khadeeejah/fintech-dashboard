import React from 'react';
import styled from 'styled-components';


const DarkSwitchContainer = styled.div`
position: absolute;
right:0px;
top: 20px;
`

const Input = styled.input``;
const Label = styled.label`
cursor: pointer;
`

export function DarkSwitch(){
    return <div>
        <DarkSwitchContainer>
        <Label>
        <Input type= "checkbox"/>
        Dark Mode
        </Label>
        </DarkSwitchContainer>
        
        
        
    </div>
}