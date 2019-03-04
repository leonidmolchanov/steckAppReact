import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Table } from 'react-bootstrap';

const divStyle = {
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '10px',
    marginBottom: '10px',
};

class TableContent extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let tableHeader;
    tableHeader =
        <tr>
            <td rowSpan="2"><strong>Сотрудник</strong></td>
            <td rowSpan="2"><strong>Задач в работе</strong></td>
            <td rowSpan="2"><strong>Задач выполнено</strong></td>
            <td rowSpan="2"><strong>Участвует в проектах за период</strong></td>
            <td colSpan="4"><strong>CRM</strong></td>
            <td rowSpan="2"><strong>Участие в живой ленте</strong></td>
        </tr>



 let tableSubheader =  <tr>
    <td><strong>Лиды</strong></td>
    <td><strong>Сделки</strong></td>
    <td><strong>Контакты и компании</strong></td>
    <td><strong>Дела</strong></td>
</tr>
        let tableTemplate;
        tableTemplate = this.props.content.map((row, i) => {
            return <tr key={i}><td>{row['name']}</td><td>{row['taskDo'] && this.props.checkBoxTasks ? (row['taskDo']):('-')}</td><td>{row['taskEnd'] && this.props.checkBoxTasks ? (row['taskEnd']):('-')}</td><td>1</td><td>{(row['leadsClose'] || row['leadsOpen']) && this.props.checkBoxCRM ? (row['leadsClose']+'('+row['leadsOpen']+')'):('-')}</td><td>{(row['activitysOpen'] || row['activitysClose']) && this.props.checkBoxCRM ? (row['activitysOpen']+'('+row['activitysClose']+')'):('-')}</td><td>{row['contacts'] && this.props.checkBoxCRM ? (row['contacts']):('-')}</td><td>{(row['dealsOpen'] || row['dealsClose']) && this.props.checkBoxCRM ? (row['dealsOpen']+'('+row['dealsClose']+')'):('-')}</td><td>{row['blogposts'] && this.props.checkBoxLine ? (row['blogposts']):('-')}</td></tr>
        })
        return (
            <Row style={divStyle}>
                <Table variant="table table-striped table-bordered table-hover dataTable no-footer">
                    <thead>{tableHeader}{tableSubheader}</thead>
                    <tbody>{tableTemplate}</tbody>
                </Table>
            </Row>

        )
    }
}

export default TableContent;