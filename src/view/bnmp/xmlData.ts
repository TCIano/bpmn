// export const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="5.1.2">
// <process id="Process_1" isExecutable="false">
//     <bpmn:startEvent id="Event_1wmerec" name="test1"/>
// </process>
// <bpmndi:BPMNDiagram id="BpmnDiagram_1">
//     <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">

//     </bpmndi:BPMNPlane>
// </bpmndi:BPMNDiagram>
// </definitions>`

// export const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>

// <bpmn:definitions targetNamespace="http://bpmn.io/schema/bpmn" id="Definitions_0001" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

// <bpmn:process id="Process_7" isExecutable="true" >

// <bpmn:startEvent   />

// </bpmn:process>

// <bpmndi:BPMNDiagram >

// <bpmndi:BPMNPlane >

// <bpmndi:BPMNShape >

// <dc:Bounds height="36" width="36" y="302" x="232"/>

// <bpmndi:BPMNLabel>

// <dc:Bounds height="14" width="23" y="345" x="239"/>

// </bpmndi:BPMNLabel>

// </bpmndi:BPMNShape>

// </bpmndi:BPMNPlane>

// </bpmndi:BPMNDiagram>

// </bpmn:definitions>`

// export const xmlStr = `"<?xml version="1.0" encoding="UTF-8"?>
// <bpmn:definitions xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:magic="http://ntc" id="Definitions_0001" targetNamespace="http://bpmn.io/schema/bpmn"><bpmn:process id="Process_1" isExecutable="true"><bpmn:startEvent /><bpmn:userTask id="Activity_1ez353v" magic:spell="name" magic:value="value" UserTaskSelectPropsValue="78" /></bpmn:process><bpmndi:BPMNDiagram><bpmndi:BPMNPlane bpmnElement="Process_1"><bpmndi:BPMNShape id="Activity_1ez353v_di" bpmnElement="Activity_1ez353v"><dc:Bounds x="-80" y="-170" width="100" height="80" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>"`

export const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="5.1.2">
<process id="Process_1" isExecutable="true">
    <startEvent >
    </startEvent>
    <task >
    </task>
</process>
<bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
    <bpmndi:BPMNShape id="StartEvent_1y45yut_di" bpmnElement="StartEvent_1y45yut">
        <omgdc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
        <omgdc:Bounds x="160" y="145" width="22" height="14" />
        </bpmndi:BPMNLabel>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="Task_1hcentk_di" bpmnElement="Task_1hcentk">
        <omgdc:Bounds x="240" y="80" width="100" height="80" />
    </bpmndi:BPMNShape>
    <bpmndi:BPMNEdge id="SequenceFlow_0h21x7r_di" bpmnElement="SequenceFlow_0h21x7r">
        <omgdi:waypoint x="188" y="120" />
        <omgdi:waypoint x="240" y="120" />
    </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</definitions>`
