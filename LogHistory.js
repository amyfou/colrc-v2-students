/**
 * Editor: Minh Ngo
 * Provides a history display for the roots history,
 * affix history, and stem history
 */

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import TableStyles from "./../stylesheets/table-styles";
import "./../stylesheets/LogHistory.css";

function LogHistory(props) {
    let { logData, tableName } = props;

    return (
        <div className="log-history-container">
            <h1 className="log-history-title">{ tableName } History</h1>
            {getRows(logData).map((log, i) => (
            <Accordion key={'log-accordion-' + i} className="log-accordion" allowZeroExpanded preExpanded={['log-item-0']}>
                <AccordionItem uuid={ 'log-item-' + i }>
                <AccordionItemHeading>
                    <AccordionItemButton className="log-accordion-button">{ log.timestamp }</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="log-panel-content">
                    { /* User info*/ }
                    <div className="log-section">
                        <h3 className="log-section-title">User Information</h3>
                        <div className="log-info-item">User Id: { log.userId }</div>
                        <div className="log-info-item">User Role: { log.userRole }</div>
                    </div>

                    { /* Query info*/ }
                    <div className="log-section">
                        <h3 className="log-section-title">Query Information</h3>
                        <div className="log-section-subtitle">ID: { log.id }</div>
                        <div className="log-info-item">Action: { resolveAction(log.action) }</div>
                        <p className="log-section-text">Query: { log.query }</p>
                    </div>

                    { /* Query Edits */ }
                    <div className="log-section">
                        <h3 className="log-section-title">Changes</h3>
                        <TableStyles>
                            <table>
                            <tbody>
                                <tr>
                                <td><b>Element</b></td>
                                <td><b>Before</b></td>
                                <td><b>After</b></td>
                                </tr>
                                { Object.keys(log.data).map((key, i) => (
                                    <tr key={'log_table' + i}>
                                    <td key={i + "log_data_key"}>{key}</td>
                                    <td key={i + "log_data_value"}>{log.data[key]}</td>
                                    <td key={i + "log_data_change"}>{log.changes[key] ?? "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </TableStyles>
                    </div>
                    </div>
                </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
            ))}
        </div>
    )
}

function getRows(data) {
    console.log("DATA" + data )
    if (!data) return {};
    let rows = data.map((elem) => {
        let log = {

        // query data
        id: elem.event_id,
        schema: elem.schema_name,
        relid: elem.relid,
        session: elem.session_user_name,
        action: elem.action,
        query: elem.client_query,
        userId: elem.hasura_user ? elem.hasura_user["x-hasura-user-id"] : null,
        userRole: elem.hasura_user ? elem.hasura_user["x-hasura-role"] : null,
        timestamp: (new Date(elem.action_tstamp_clk)).toISOString(),
        transactionId: elem.transaction_id,
        appName: elem.application_name,

        // addr: elem.client_addr,

        // root data
        data: elem.row_data ?? {},
        changes: elem.changed_fields ?? {}
        }
        return log;
    })
    return rows;
}

function resolveAction(action) {
    switch (action) {
        case 'I':
            return 'Insert'
        case 'U':
            return 'Update'
        case 'D':
            return 'Delete'
        default:
            return action;
    }
}

export default LogHistory;
