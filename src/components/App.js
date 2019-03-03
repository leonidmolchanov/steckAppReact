import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
                        checkBoxCRM: true,
                        checkBoxTasks: true,
                        checkBoxLine: false};

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
            const state = {
                CRM: this.state.checkBoxCRM,
                tasks: this.state.checkBoxTasks,
                line: this.state.checkBoxLine
            }
            getContentUsers(callback, this.state.content, state)

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
                            <Select placeholder={'период'} options={options}/>
                        </Col>
                        <Col sm={4} xs={4}>
                            <Button onClick={this.getContent} variant="primary"> Сформировать</Button>
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
<TableContent checkBoxCRM={this.state.checkBoxCRM}  checkBoxLine={this.state.checkBoxLine} checkBoxTasks={this.state.checkBoxTasks} content={this.state.content} />
                    ) : ('Идет загрузка')}
                </div>
            );

        }

}
}

function  getContentUsers(callback, arr, state) {
    if(state.tasks) {
        setTimeout(function (){getTasks(callback, arr)}, 1000)
    }
    if(state.CRM) {
    setTimeout(function (){getLeads(callback, arr)}, 2000)
        setTimeout(function (){getDeals(callback, arr)}, 3000)
        setTimeout(function (){getContacts(callback, arr)}, 4000)
        setTimeout(function (){getActivitys(callback, arr)}, 5000)
    }

    if(state.line) {
        setTimeout(function (){getBlogpost(callback, arr)}, 6000)
    }

}

// function  getContentUsers(callback, arr, state) {
//     const makeRequest = async () => {
//         if(state.CRM) {
//             await  getLeads(callback, arr)
//             await getDeals(callback, arr)
//             await  getContacts(callback, arr)
//             await  getActivitys(callback, arr)
//         }
//         if(state.tasks) {
//             await getTasks(callback, arr)
//         }
//         if(state.line) {
//             await getBlogpost(callback, arr)
//         }
//         throw new Error("oops");
//     }
//
//     makeRequest()
//         .catch(err => {
//             console.log(err);
//             // вывод
//             // Error: oops at makeRequest (index.js:7:9)
//         })
//
// }



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

function getBlogpost(callback, arr) {
    arr.forEach(function (item) {
        let count = 0;
        setTimeout(
            function() {
                BX24.callMethod(
                    "log.blogpost.get",
                    {
                        filter: {"AUTHOR_ID": item['id']},
                        select: ["ID"]
                    },
                    function (result) {
                        if (result.error())
                            console.error(result.error());
                        else {
                            count += result.data().length


                            arr = arr.map(function (elem) {
                                if (elem['id'] == item['id']) {
                                    elem['blogposts'] = count
                                }
                                return elem
                            })
                            callback(arr)
                            if (result.more())
                                result.next();
                        }
                    }
                );
            }, 1500)
    })
    console.log('bloglistLoad')
}


function getActivitys(callback, arr) {
    arr.forEach(function (item) {
        let count = 0;
        setTimeout(
            function() {
                BX24.callMethod(
                    "crm.activity.list",
                    {
                        filter: {"AUTHOR_ID": item['id']},
                        select: ["ID"]
                    },
                    function (result) {
                        if (result.error())
                            console.error(result.error());
                        else {
                            count += result.data().length


                            arr = arr.map(function (elem) {
                                if (elem['id'] == item['id']) {
                                    elem['activitys'] = count
                                }
                                return elem
                            })
                            callback(arr)
                            if (result.more())
                                result.next();
                        }
                    }
                );
            }, 1500)
    })
    console.log('activityLoad')

}

function getContacts(callback, arr) {
    arr.forEach(function (item) {
        let count = 0;
        setTimeout(
            function() {
                BX24.callMethod(
                    "crm.contact.list",
                    {
                        filter: {"CREATED_BY_ID": item['id']},
                        select: ["ID"]
                    },
                    function (result) {
                        if (result.error())
                            console.error(result.error());
                        else {
                            count += result.data().length


                            arr = arr.map(function (elem) {
                                if (elem['id'] == item['id']) {
                                    elem['contacts'] = count
                                }
                                return elem
                            })
                            callback(arr)
                            if (result.more())
                                result.next();
                        }
                    }
                );
            }, 1500)
    })
    console.log('contactLoad')

}

function getDeals(callback, arr) {
    arr.forEach(function (item) {
        let count = 0;
        setTimeout(
            function() {
                BX24.callMethod(
                    "crm.deal.list",
                    {
                        filter: {"CREATED_BY_ID": item['id']},
                        select: ["ID"]
                    },
                    function (result) {
                        if (result.error())
                            console.error(result.error());
                        else {
                            count += result.data().length


                            arr = arr.map(function (elem) {
                                if (elem['id'] == item['id']) {
                                    elem['deals'] = count
                                }
                                return elem
                            })
                            callback(arr)
                            if (result.more())
                                result.next();
                        }
                    }
                );
            }, 1500)
    })
}

function getLeads(callback, arr) {
    arr.forEach(function (item) {
        let count = 0;
        setTimeout(
            function() {
                BX24.callMethod(
                    "crm.lead.list",
                    {
                        filter: {"CREATED_BY_ID": item['id']},
                        select: ["ID", "TITLE"]
                    },
                    function (result) {
                        if (result.error())
                            console.error(result.error());
                        else {
                            count += result.data().length


                            arr = arr.map(function (elem) {
                                if (elem['id'] == item['id']) {
                                    elem['leads'] = count
                                }
                                return elem
                            })
                            callback(arr)
                            if (result.more())
                                result.next();
                        }
                    }
                );
            },1500)
    })
    console.log('leadsLoad')

}


// function getTasks(callback, arr) {
//     arr.forEach(function (item) {
//         let countEnd = 0;
//         let countDo = 0;
//         setTimeout(
//             function() {
//                 BX24.callMethod(
//                     "task.item.list",
//                     [
//                         {ID: 'desc'},		// Сортировка по ID — по убыванию.
//                         {RESPONSIBLE_ID: item['id']},	// Фильтр
//                         {}
//                     ],
//
//                     function (result) {
//                         if (result.error())
//                             console.error(result.error());
//                         else {
//
//                             let request = result.data();
//                             request.forEach(function (tasks) {
//                                 if (tasks['STATUS'] == 5) {
//                                     countEnd++
//                                 }
//                                 countDo++
//
//                             })
//                             arr = arr.map(function (elem) {
//                                 if (elem['id'] == item['id']) {
//                                     elem['taskEnd'] = countEnd
//                                     elem['taskDo'] = countDo
//                                     // console.log('do:' + countDo)
//
//                                 }
//                                 return elem
//                             })
//
//                             if (result.more())
//                                 result.next();
//                         }
//                     }
//                 )
//             }, 1500)
//     })
//     console.log('tasksLoad')
//
// }


function getTasks(callback, arr) {
        let countEnd = 0;
        let countDo = 0;
        let idArr = arr.map(function (elem) {
                elem['taskEnd'] = countEnd
                elem['taskDo'] = countDo
                // console.log('do:' + countDo)

            return elem['id']
        })
        setTimeout(
            function() {
                BX24.callMethod(
                    "task.item.list",
                    [
                        {ID: 'desc'},		// Сортировка по ID — по убыванию.
                        {RESPONSIBLE_ID: idArr},	// Фильтр
                        {}
                    ],

                    function (result) {
                        if (result.error())
                            console.error(result.error());
                        else {

                            let request = result.data();
                            request.forEach(function (tasks) {

                                arr = arr.map(function (elem) {
                                    if (elem['id'] == tasks['RESPONSIBLE_ID']) {
                                        if (tasks['STATUS'] == 5) {
                                            elem['taskEnd']++
                                        }
                                        elem['taskDo']++
                                        // console.log('do:' + countDo)

                                    }
                                    return elem
                                })
                            })


                            if (result.more())
                                result.next();
                        }
                    }
                )
            }, 1500)
    console.log('tasksLoad')

}

export default App;