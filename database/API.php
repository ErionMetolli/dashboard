<?php
/**
 * Created by PhpStorm.
 * User: noire
 * Date: 1/11/17
 * Time: 1:12 PM
 */
require("Database.php");

$response = array(
    'success' => false,
    'data' => NULL,
    'message' => NULL
);

try {
    $host = parse_ini_file("database.config")['host'];
    $dbname = parse_ini_file("database.config")['dbname'];
    $dbuser = parse_ini_file("database.config")['dbuser'];
    $dbpass = parse_ini_file("database.config")['dbpass'];

    $database = new Database($host, $dbname, $dbuser, $dbpass);

    $cmd = isset($_REQUEST['cmd']) ? $_REQUEST['cmd'] : NULL;
    $start = isset($_REQUEST['start']) ? $_REQUEST['start'] : NULL;
    $limit = isset($_REQUEST['limit']) ? $_REQUEST['limit'] : NULL;

    switch ($cmd) {
        case 'logs':
            $search = isset($_REQUEST['search']) ? $_REQUEST['search'] : NULL;
            // todo: trim, stripslashes to prevent sql injections etc...
            if(!is_numeric($search))
                $query = 'SELECT entries.entryid, lpad(cast(users.userid as text),12, \'00000000\') as userid,concat(users.name, \' \',users.surname) as name,entries.description,to_char(entries.startdate, \'DD-MM-YYYY HH24:MI:SS\') as startdate,to_char(entries.enddate, \'DD-MM-YYYY HH24:MI:SS\') as enddate,status.status, entries.startdate as date FROM entries LEFT JOIN users ON entries.userid = users.userid LEFT JOIN status ON entries.statusid = status.statusid WHERE concat(users.name, \' \',users.surname) ILIKE \'%'.$search.'%\' ORDER BY date DESC LIMIT '.$limit.' OFFSET '.$start;
            else
                $query = 'SELECT entries.entryid, lpad(cast(users.userid as text),12, \'00000000\') as userid,concat(users.name, \' \',users.surname) as name,entries.description,to_char(entries.startdate, \'DD-MM-YYYY HH24:MI:SS\') as startdate,to_char(entries.enddate, \'DD-MM-YYYY HH24:MI:SS\') as enddate,status.status, entries.startdate as date FROM entries LEFT JOIN users ON entries.userid = users.userid LEFT JOIN status ON entries.statusid = status.statusid WHERE users.userid = '.$search.' ORDER BY date DESC LIMIT '.$limit.' OFFSET '.$start;

            $data = $database->SELECT($query);

            $total = $database->SELECT('SELECT COUNT(*) as total from entries  WHERE entries.userid in (SELECT userid FROM users WHERE concat(users.name, \' \',users.surname) ILIKE \'%'.$search.'%\')');

            $response['total'] = $total[0]['total'];
            $response['data'] = $data;
            $response['success'] = true;
            break;
        case 'mainchart':
            $query = 'SELECT COUNT(*) FILTER (WHERE statusid = 3) as rejected,COUNT(*) FILTER (WHERE statusid = 1 OR statusid = 2) as allowed,to_char(startdate, \'DD-MM-YYYY\') as startdate,startdate as date FROM entries GROUP BY date ORDER BY date ASC';

            $qr = $database->SELECT($query);

            /*
             * Get the first item's date ( that will be the starting date since the result will be ASCENDING by 'startdate'
             */
            $start_date = $qr[0]['startdate'];
            $start_time = strtotime($start_date);

            /*
             * And the end date will be the last item's date on the query results
             * or in the future we can handle it by a request to change the chart range
             */
            $end_date = $qr[sizeof($qr) - 1]['startdate'];

            // Need to add one day to the end date, or otherwise it won't take the last item's day
            $end_time = strtotime($end_date."+1 Day", $start_time);

            // Uncomment to limit to one month
            /*
            // Get one month
            $start_date = date('d-m-Y', strtotime('-1 month'));
            $start_time = strtotime($start_date);
            // Get this date
            $end_date = date('d-m-Y', strtotime(date('Y-m-d')));
            $end_time = strtotime($end_date);
            */
            // Avoiding warnings for possible undeclared variable
            $data = "";

            /*
             * Add elements(date, allowed=0, rejected=0) to $data array for every day
             */
            $startingYear = 0;
            $endingYear = 0;
            for($i=$start_time; $i<$end_time; $i+=86400)
            {
                if($i == $start_time)
                    $startingYear = date('Y', $i);
                $data[] = ["allowed"=>0, "rejected"=>0, "date"=>date('d-m-Y', $i)];

                if($i == $end_time-86400)
                    $endingYear = date('Y', $i);
            }

            // Change total value for every date that exists in the result of the query
            foreach($qr as $result){
                for($i = 0; $i < sizeof($data); $i+=1){
                    if($result['startdate'] == $data[$i]['date']){
                        $data[$i]['allowed'] += $result['allowed'];
                        $data[$i]['rejected'] += $result['rejected'];
                    }
                }
            }

            // Remove year from x-field if the year is the same
            for($i = 0; $i < sizeof($data); $i++){
                if($startingYear == $endingYear) {
                    $temp = explode('-', $data[$i]['date']);
                    $data[$i]['date'] = $temp[0] . '-' . $temp[1];
                }else{
                    break;
                }
            }

            $response['data'] = $data;
            $response['success'] = true;
            break;
        case 'piedailystats':
            $query = 'SELECT COUNT(*) FILTER (WHERE statusid = 1) as active,COUNT(*) FILTER (WHERE statusid = 2) as allowed,COUNT(*) FILTER (WHERE statusid = 3) as rejected FROM entries WHERE cast(to_char(startdate, \'YYYY-MM-DD\') as date) = current_date';

            $data = $database->SELECT($query);
            /*
             *  Formatting for Pie Chart purpose
             *  e.g: {"label": "active", "value": 1},{"label": "allowed", "value": 1},{"label": "rejected", "value": 2}
             */
            foreach($data as $item){
                for($i = 0; $i < sizeof($item); $i++){
                    $label = array_keys($item)[$i];

                    if(array_keys($item)[$i] == 'allowed')
                        $label = 'Perfundim';
                    else if(array_keys($item)[$i] == 'rejected')
                        $label = 'Ndalim';
                    else if(array_keys($item)[$i] == 'active')
                        $label = 'Aktivë';

                    if($item[array_keys($item)[$i]] != 0)
                        $formattedData[] = ['label' => $label, 'value' => $item[array_keys($item)[$i]]];
                }
            }

            $response['data'] = $formattedData;
            $response['success'] = true;
            break;
        case 'dailystats':
            $query = 'SELECT COUNT(*) FILTER (WHERE statusid = 1) as active,COUNT(*) FILTER (WHERE statusid = 2) as finished,COUNT(*) FILTER (WHERE statusid = 3) as rejected,to_char((SUM(enddate-startdate) / count(enddate-startdate)), \'HH:MI:SS\') as average FROM entries WHERE cast(to_char(startdate, \'YYYY-MM-DD\') as date) = current_date';

            $data = $database->SELECT($query);

            /*
             *  Formatting to make it a horizontal list
             *  and formatting hours minutes and seconds to show like e.g: '1 ore 2 minuta e 1 sekonde'
             */
            foreach($data as $item){
                for($i = 0; $i < sizeof($item); $i++){
                    $label = array_keys($item)[$i];
                    $value = "";    // Just to avoid undefined possibility warning
                    if($label == 'average') {
                        // Separate times by exploding on delimiter ":"
                        $value = explode(':', $item[array_keys($item)[$i]]);

                        // Save hours minutes and seconds on separate variables
                        $hours = $value[0];
                        $minutes = $value[1];
                        $seconds = $value[2];

                        // Give default values to string hours minutes and seconds
                        $sHours = " orë ";
                        $sMinutes = " minuta e ";
                        $sSeconds = " sekonda";

                        /*
                         * Explanation:
                         * ltrim($str, '0') strips every leading zero so if its 00 hours minutes or seconds
                         * it will trim everything and it will be an empty variable, so if the number is 0
                         * don't left trim just give the value 0
                         */
                        if (intval($hours) == 0)
                            $hours = 0;
                        else
                            $hours = ltrim($value[0], '0');

                        // Same as the previous explanation
                        if (intval($minutes) == 0)
                            $minutes = 0;
                        else {
                            if (intval($minutes) == 1) // '1 minuta' makes no sense so change it to '1 minutë'
                                $sMinutes = " minutë e ";
                            $minutes = ltrim($value[1], '0');
                        }

                        // Same as the previous explanation
                        if (intval($seconds) == 0)
                            $seconds = 0;
                        else {
                            if (intval($seconds) == 1) // '1 sekonda' makes no sense so change it to '1 sekondë'
                                $sSeconds = " sekondë";
                            $seconds = ltrim($value[2], '0');
                        }

                        // After formatting properly glue them all together
                        $value = $hours . $sHours . $minutes . $sMinutes . $seconds . $sSeconds;

                        $label = 'Mesatarja e qëndrimit';
                    }else if($label == 'active'){
                        $label = 'Aktivë tani';
                        $value = $item[array_keys($item)[$i]]." persona";
                    }else if($label == 'finished'){
                        $label = 'Kanë përfunduar';
                        $value = $item[array_keys($item)[$i]]." persona";
                    }else if($label == 'rejected'){
                        $label = 'Janë ndalur';
                        $value = $item[array_keys($item)[$i]]." persona";
                    }

                    // Add this element to the array
                    $formattedData[] = ['label' => $label, 'value' => $value];
                }
            }

            $response['data'] = $formattedData;
            $response['success'] = true;
            break;
        case 'getStatus':
                $query = 'SELECT * FROM status';

                $data = $database->SELECT($query);

                $response['data'] = $data;
                $response['success'] = true;
            break;
        case 'editLog':
                $entryid = isset($_REQUEST['entryid']) ? $_REQUEST['entryid'] : NULL;
                $status = isset($_REQUEST['status']) ? $_REQUEST['status'] : NULL;
                $description = isset($_REQUEST['description']) ? $_REQUEST['description'] : NULL;

                $statusQuery = 'SELECT * FROM status';
                $statusData = $database->SELECT($statusQuery);

                $statusid = 0;
                foreach($statusData as $item){
                    if($item['status'] == $status){
                        $statusid = $item['statusid'];
                    }
                }

                $query = 'UPDATE entries SET statusid = '.$statusid.', description = \''.$description.'\' WHERE entryid = '.$entryid;

                $database->UPDATE($query);

                $response['success'] = true;
                $response['message'] = "Editimi perfundoi me sukses.";
            break;
        case 'getUsers':
                $search = isset($_REQUEST['searchUser']) ? $_REQUEST['searchUser'] : NULL;
                if(!is_numeric($search)) // or ! filter_var($search, FILTER_VALIDATE_INT) for integers (excluding decimals and zero)
                    $query = 'SELECT userid, name, cardid, surname, concat(users.name, \' \',users.surname) as full_name FROM users WHERE concat(users.name, \' \',users.surname) LIKE \'%'.$search.'%\'';
                else
                    $query = 'SELECT userid, name, cardid, surname, concat(users.name, \' \',users.surname) as full_name FROM users WHERE userid = '.$search;

                $data = $database->SELECT($query);

                $response['data'] = $data;
                $response['success'] = true;
            break;
        case 'addLog':
            $userid = isset($_REQUEST['userid']) ? $_REQUEST['userid'] : NULL;
            $description = isset($_REQUEST['description']) ? $_REQUEST['description'] : NULL;
            $startdate = isset($_REQUEST['startdate']) ? $_REQUEST['startdate'] : NULL;
            $enddate = isset($_REQUEST['enddate']) ? $_REQUEST['enddate'] : NULL;
            $statusid = isset($_REQUEST['statusid']) ? $_REQUEST['statusid'] : NULL;

            if($enddate != NULL)
                $query = 'INSERT INTO entries(userid, description, startdate, enddate, statusid) VALUES(\''.$userid.'\', \''.$description.'\', \''.$startdate.'\', \''.$enddate.'\', \''.$statusid.'\')';
            else
                $query = 'INSERT INTO entries(userid, description, startdate, statusid) VALUES(\''.$userid.'\', \''.$description.'\', \''.$startdate.'\', \''.$statusid.'\')';

            $database->INSERT($query);

            $response['message'] = 'Hyrja u shtua me sukses.';
            $response['success'] = true;
            break;
        case 'removeLog':
            $entryid = isset($_REQUEST['entryid']) ? $_REQUEST['entryid'] : NULL;

            $query = 'DELETE FROM entries WHERE entryid = '.$entryid;

            $database->DELETE($query);

            $response['message'] = "Hyrja u fshi me sukses.";
            $response['success'] = true;
            break;
        case 'addUser':
            $cardid = isset($_REQUEST['cardid']) ? $_REQUEST['cardid'] : NULL;
            $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : NULL;
            $surname = isset($_REQUEST['surname']) ? $_REQUEST['surname'] : NULL;

            // Get the last userid and add one
            $query = 'SELECT userid FROM users ORDER BY userid DESC LIMIT 1';
            $userid = intval($database->SELECT($query)[0]['userid']) + 1;

            $query = 'INSERT INTO users(userid, cardid, name, surname) VALUES('.$userid.', '.$cardid.', \''.$name.'\', \''.$surname.'\')';

            $database->INSERT($query);

            $response['message'] = 'Klienti u shtua me sukses.';
            $response['success'] = true;
            break;
        case 'removeUser':
            $userid = isset($_REQUEST['userid']) ? $_REQUEST['userid'] : NULL;

            $query = 'DELETE FROM users WHERE userid = '.$userid;

            $database->DELETE($query);

            $response['message'] = "Klienti u fshi me sukses.";
            $response['success'] = true;
            break;
        case 'editUser':
            $userid = isset($_REQUEST['userid']) ? $_REQUEST['userid'] : NULL;
            $cardid = isset($_REQUEST['cardid']) ? $_REQUEST['cardid'] : NULL;
            $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : NULL;
            $surname = isset($_REQUEST['surname']) ? $_REQUEST['surname'] : NULL;

            $query = 'UPDATE users SET cardid = '.$cardid.', name = \''.$name.'\', surname = \''.$surname.'\' WHERE userid = '.$userid;

            $database->UPDATE($query);

            $response['success'] = true;
            $response['message'] = "Editimi perfundoi me sukses.";
            break;
        default:
            $response['message'] = "Kjo komande nuk ekziston.";
    }
}catch(Exception $e){
    $response['message'] = $e->getMessage();
}
if(isset($_REQUEST['debug'])){
    echo '<pre>';
    print_r($response['data']);
    echo '</pre>';
}
echo json_encode($response);