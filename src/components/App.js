import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Moment from 'moment';
import InputGroup from 'react-bootstrap/InputGroup'
import '../styles/App.css';
import  TableContent from './tableContent.component';
const options = [
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
    { value: 'quarter', label: 'Квартал' },
    { value: 'year', label: 'Год' },
    { value: 'all', label: 'Без ограничения' }
]
const divStyle = {
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '10px',
    marginBottom: '10px',
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoad: false,
                        content: false,
                        checkBoxCRM: false,
                        checkBoxTasks: false,
                        checkBoxLine: false,
                        tasksReady: true,
                        leadsReady: true,
                        dealsReady: true,
            activityReady: true,
            contactsReady: true,
            bloglistReady: true,
            selectDateInterval: false};

    }
getStartLoad=()=>{
       let callback=(content)=>{
            if(content){
                this.setState({content: []});
                this.setState({isLoad: true});
                this.setState({content: content});
            }
        }
    getUserStatus(callback)

}
    componentDidMount() {
        this.getContent = () => {
            let callback = (content) => {
                if (content) {
                    this.setState({content: content});
                }
            }
            let callbackReadyFalse = (content) => {
                switch (content) {
                    case 'CRM':
                        this.setState({leadsReady: false});
                        this.setState({dealsReady: false});
                        this.setState({contactsReady: false});
                        this.setState({activityReady: false});
                        break;
                    case 'line':
                        this.setState({bloglistReady: false});
                        break;
                    case 'tasks':
                        this.setState({tasksReady: false});
                        break;
                    default:
                }
            }
            let callbackReadyTrue = (content) => {
                switch (content) {
                    case 'leads':
                        this.setState({leadsReady: true});
                        break;
                    case 'deals':
                        this.setState({dealsReady: true});
                        break;
                    case 'contacts':
                        this.setState({contactsReady: true});
                        break;
                    case 'activity':
                        this.setState({activityReady: true});
                        break;
                    case 'bloglist':
                        this.setState({bloglistReady: true});
                        break;
                    case 'tasks':
                        this.setState({tasksReady: true});
                        break;
                    default:
                }
            }
            const state = {
                CRM: this.state.checkBoxCRM,
                tasks: this.state.checkBoxTasks,
                line: this.state.checkBoxLine
            }
            getContentUsers(callback, this.state.content, state, this.state.selectDateInterval, callbackReadyTrue, callbackReadyFalse)

        }
    }
    selectDateInterval = (e)=>{
        let today = new Date;
        console.log(e.value)
        switch (e.value) {
            case 'week':
                console.log('err')
                this.setState({selectDateInterval: Moment(today).subtract('days', 7).format('YYYY-MM-DD')});
                break;
            case 'month':
                this.setState({selectDateInterval: Moment(today).subtract('months', 1).format('YYYY-MM-DD')});
                break;
            case 'quarter':
                this.setState({selectDateInterval: Moment(today).subtract('months', 3).format('YYYY-MM-DD')});
                break;
            case 'year':
                this.setState({selectDateInterval: Moment(today).subtract('months', 12).format('YYYY-MM-DD')});
                break;
            default:
                this.setState({selectDateInterval: false});
        }
    }
checkBoxTasksChange = (e)=>{
    this.setState({checkBoxTasks: !this.state.checkBoxTasks});
}
    checkBoxCRMChange = (e)=>{
        this.setState({checkBoxCRM: !this.state.checkBoxCRM});
    }
    checkBoxLineChange = (e)=>{
        this.setState({checkBoxLine: !this.state.checkBoxLine});
    }
    render() {
        if(!this.state.isLoad){
            this.getStartLoad()
            return(' Идет загрузка...')
        }
        else{
            return (
                <div style={divStyle}>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                        crossOrigin="anonymous"
                    />
                    <Row style={divStyle}>
                        <Col sm={2} xs={2}>
                            <Select placeholder={'период'} onChange={this.selectDateInterval} options={options}/>
                        </Col>
                        <Col sm={4} xs={4}>
                            {this.state.tasksReady &&
                            this.state.leadsReady &&
                            this.state.dealsReady &&
                            this.state.activityReady &&
                            this.state.contactsReady &&
                            this.state.bloglistReady ? (
                            <Button onClick={this.getContent} variant="primary"> Сформировать</Button>
                                ):('Подождите...')}
                        </Col>
                        <Col sm={6} xs={6}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Задачи и проекты:</InputGroup.Text>
                                    <InputGroup.Checkbox onChange={this.checkBoxTasksChange} defaultChecked={this.state.checkBoxTasks} />
                                </InputGroup.Prepend>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>CRM:</InputGroup.Text>
                                    <InputGroup.Checkbox onChange={this.checkBoxCRMChange} defaultChecked={this.state.checkBoxCRM} />
                                </InputGroup.Prepend>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Живая лента:</InputGroup.Text>
                                    <InputGroup.Checkbox onChange={this.checkBoxLineChange} defaultChecked={this.state.checkBoxLine} />
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>
                    </Row>
                    {this.state.content ? (
<TableContent checkBoxCRM={this.state.checkBoxCRM}  checkBoxLine={this.state.checkBoxLine} checkBoxTasks={this.state.checkBoxTasks} content={this.state.content}/>
                    ) : ('Идет загрузка')}
                </div>
            );

        }

}
}

function  getContentUsers(callback, arr, state, date, callbackReadyTrue, callbackReadyFalse) {
    arr.forEach(function (elem, key) {
        arr[key]['taskEnd'] = 0;
        arr[key]['taskDo'] = 0;
        arr[key]['leadsOpen'] = 0;
        arr[key]['leadsClose'] = 0;
        arr[key]['dealsOpen'] = 0;
        arr[key]['dealsClose'] = 0;
        arr[key]['activitysClose'] =0;
        arr[key]['activitysOpen'] =0;
        arr[key]['contacts'] = 0;
        arr[key]['blogposts'] = 0;

    })
    callback(arr)
console.log(date)
    if(state.tasks) {
        callbackReadyFalse('tasks')
        setTimeout(function (){getTasks(callback, arr, date, callbackReadyTrue)}, 1000)
    }
    if(state.CRM) {
        callbackReadyFalse('CRM')
    setTimeout(function (){getLeads(callback, arr, date, callbackReadyTrue)}, 2000)
        setTimeout(function (){getDeals(callback, arr, date, callbackReadyTrue)}, 3000)
        setTimeout(function (){getContacts(callback, arr, date, callbackReadyTrue)}, 4000)
        setTimeout(function (){getActivitys(callback, arr, date, callbackReadyTrue)}, 5000)
    }

    if(state.line) {
        callbackReadyFalse('line')
        setTimeout(function (){getBlogpost(callback, arr, date, callbackReadyTrue)}, 6000)
    }

}


function getUserStatus(callback) {
    BX24.callMethod('user.current', {}, function(res){
        let  result = res.data();


        BX24.callMethod('department.get', {"ID": result['UF_DEPARTMENT']}, function (dep) {
            dep=dep.data();
            let state=false
            dep.forEach(function (item) {
                if(item['UF_HEAD']){
                    state = true
                }
            })
            if(state || result['ID']==1){


                BX24.callMethod('user.current', {}, function (res) {
                    let deportament = res.data()["UF_DEPARTMENT"];
                    BX24.callMethod(
                        "user.get",
                        {
                            filter: {"UF_DEPARTMENT": deportament}
                        },
                        function (res) {
                            let content = res.data().map(function (item) {
                                return {id: item['ID'], name: item['NAME']}
                            })

                            callback(content)
                        }
                    )
                })



            }
            else{
               callback(false)
            }
        });
    });
}

function getBlogpost(callback, arr, date, callbackReadyTrue) {
    let idArr = arr.map(function (elem) {
        return elem['id']
    })
    let filterSet
    if(date) {
        filterSet = {"AUTHOR_ID": idArr, ">=DATE_PUBLISH" : date}
    }
    else{
        filterSet = {"AUTHOR_ID": idArr}

    }
    setTimeout(
        function() {
            BX24.callMethod(
                "log.blogpost.get",
                {
                    filter: filterSet,
                    select: ["ID"]
                },
                function (result) {
                    if (result.error())
                        console.error(result.error());
                    else {
                        result.data().forEach(function (item) {
                            arr.forEach(function (elem, key) {
                                if (arr[key]['id'] == item['AUTHOR_ID']) {
                                    arr[key]['blogposts']++
                                }

                            })
                            callback(arr)

                        })
                        if (result.more()){
                            result.next();}
                        else{
                            callbackReadyTrue('bloglist')
                        }
                    }
                }
            );
        }, 1500)
    console.log('bloglistLoad')

}


function getActivitys(callback, arr,date, callbackReadyTrue) {
    let idArr = arr.map(function (elem) {
        return elem['id']
    })
    let filterSet
    if(date) {
        filterSet = {"AUTHOR_ID": idArr, ">=CREATED" : date}
    }
    else{
        filterSet = {"AUTHOR_ID": idArr}

    }
    setTimeout(
        function() {
            BX24.callMethod(
                "crm.activity.list",
                {
                    filter: filterSet,
                    select: ["ID", "AUTHOR_ID", "STATUS"]
                },
                function (result) {
                    if (result.error())
                        console.error(result.error());
                    else {
                        result.data().forEach(function (item) {
                            arr.forEach(function (elem, key) {
                                if (arr[key]['id'] == item['AUTHOR_ID']) {
                                    if (item['STATUS'] == 2) {
                                        arr[key]['activitysClose']++
                                    }
                                    arr[key]['activitysOpen']++
                                }

                            })
                            callback(arr)

                        })
                        if (result.more()){
                            result.next();}
                        else{
                            callbackReadyTrue('activity')
                        }
                    }
                }
            );
        }, 1500)
    console.log('activityLoad')

}

function getContacts(callback, arr, date, callbackReadyTrue) {
        let idArr = arr.map(function (elem) {
            return elem['id']
        })
    let filterSet
    if(date) {
            filterSet = {"CREATED_BY_ID": idArr, ">=DATE_CREATE": date}
    }
    else{
        filterSet = {"CREATED_BY_ID": idArr}

    }
    console.log(filterSet)
    setTimeout(
            function() {
                BX24.callMethod(
                    "crm.contact.list",
                    {
                        filter: filterSet,
                        select: ["ID", "CREATED_BY_ID"]
                    },
                    function (result) {
                        if (result.error())
                            console.error(result.error());
                        else {
                            result.data().forEach(function (item) {

                                arr.forEach(function (elem, key) {
                                    if (arr[key]['id'] == item['CREATED_BY_ID']) {
                                        arr[key]['contacts']++
                                    }

                                })
                                callback(arr)

                            })
                            if (result.more()){
                                result.next();}
                            else{
                                callbackReadyTrue('contacts')
                            }
                        }
                    }
                );
            }, 1500)
    console.log('contactLoad')

}


function getDeals(callback, arr, date, callbackReadyTrue) {
    let idArr = arr.map(function (elem) {
        return elem['id']
    })
    let filterSet
    if(date) {
        filterSet = {"CREATED_BY_ID": idArr, ">=DATE_CREATE" : date}
    }
    else{
        filterSet = {"CREATED_BY_ID": idArr}

    }
    setTimeout(
        function() {
            BX24.callMethod(
                "crm.deal.list",
                {
                    filter: filterSet,
                    select: ["ID", "CREATED_BY_ID", "OPENED"]
                },
                function (result) {
                    if (result.error())
                        console.error(result.error());
                    else {
                        result.data().forEach(function (item) {
                            arr.forEach(function (elem, key) {
                                if (arr[key]['id'] == item['CREATED_BY_ID']) {
                                    if (item['OPENED'] !== 'Y') {
                                        arr[key]['dealsClose']++
                                    }
                                        arr[key]['dealsOpen']++
                                }

                            })
                            callback(arr)

                        })
                        if (result.more()){
                            result.next();}
                        else{
                            callbackReadyTrue('deals')
                        }
                    }
                }
            );
        }, 1500)
    console.log('dealsLoad')

}

function getLeads(callback, arr, date, callbackReadyTrue) {
    let idArr = arr.map(function (elem) {
        return elem['id']
    })
    let filterSet
    if(date) {
        filterSet = {"CREATED_BY_ID": idArr, ">=DATE_CREATE" : date}
    }
    else{
        filterSet = {"CREATED_BY_ID": idArr}

    }
    setTimeout(
        function() {
            BX24.callMethod(
                "crm.lead.list",
                {
                    filter: filterSet,
                    select: ["ID", "TITLE", "CREATED_BY_ID", "OPENED"]
                },
                function (result) {
                    if (result.error())
                        console.error(result.error());
                    else {
                        result.data().forEach(function (item) {
                            arr.forEach(function (elem, key) {
                                if (arr[key]['id'] == item['CREATED_BY_ID']) {
                                    if (item['OPENED'] == 'Y') {
                                        arr[key]['leadsOpen']++
                                    }
                                    {
                                        arr[key]['leadsClose']++
                                    }
                                }

                            })
                            callback(arr)

                        })
                        if (result.more()){
                            result.next();}
                        else{
                            callbackReadyTrue('leads')
                        }
                    }
                }
            );
        }, 1500)
    console.log('leadsLoad')

}

function getTasks(callback, arr, date, callbackReadyTrue) {
    let idArr = arr.map(function (elem) {
        return elem['id']
    })
    let filterSet
    if(date) {
        filterSet = {'RESPONSIBLE_ID': idArr, '>=CREATED_DATE' : date}
    }
    else{
        filterSet = {RESPONSIBLE_ID: idArr}

    }
    setTimeout(
        function() {
            BX24.callMethod(
                "task.item.list",
                [{ID:"ID"},
                    filterSet],
                function (result) {
                    if (result.error())
                        console.error(result.error());
                    else {
                        result.data().forEach(function (item) {
                            arr.forEach(function (elem, key) {
                                if (arr[key]['id'] == item['RESPONSIBLE_ID']) {
                                    if (item['STATUS'] == 5) {
                                        arr[key]['taskEnd']++
                                    }
                                    else {
                                        arr[key]['taskDo']++
                                    }
                                }

                            })
                            callback(arr)

                        })
                        if (result.more()){
                            result.next();}
                            else{
                            callbackReadyTrue('tasks')
                        }
                    }
                }
            );
        }, 1500)
    console.log('taskLoad')

}
export default App;