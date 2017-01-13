<?php

/**
 * Created by PhpStorm.
 * User: noire
 * Date: 1/11/17
 * Time: 1:15 PM
 */
class Database
{
    private $host;
    private $dbname;
    private $dbuser;
    private $dbpass;
    private $dbc;
    private $data;

    /**
     * Conn constructor.
     * @param $host
     * @param $dbname
     * @param $dbuser
     * @param $dbpass
     */
    public function __construct($host, $dbname, $dbuser, $dbpass){
        $this->host = $host;
        $this->dbname = $dbname;
        $this->dbuser = $dbuser;
        $this->dbpass = $dbpass;
        try{
            $this->dbc = new PDO("pgsql:dbname=$this->dbname;host=$this->host", $this->dbuser, $this->dbpass);
        }catch(PDOException $e){
            echo $e->getMessage();
            }
    }

    public function SELECT($statement)
    {
        // If two selects will be queried in one go then reset
        $sql = NULL;
        $this->data = NULL;

        $sql = $this->dbc->query($statement);

        while($result = $sql->fetch(PDO::FETCH_ASSOC)){
            $this->data[] = $result;
        }

        if(isset($_REQUEST['debug'])){
            echo '<pre>';
            echo $statement;
            print_r($this->data);
            echo '</pre>';
        }

        return $this->data;
    }

    public function INSERT($statement)
    {
        $this->dbc->query($statement);

        if(isset($_REQUEST['debug'])){
            echo '<pre>';
            echo $statement;
            echo '</pre>';
        }
    }

    public function UPDATE($statement)
    {
        $this->dbc->query($statement);

        if(isset($_REQUEST['debug'])){
            echo '<pre>';
            echo $statement;
            echo '</pre>';
        }
    }

    public function DELETE($statement)
    {
        $this->dbc->query($statement);

        if(isset($_REQUEST['debug'])){
            echo '<pre>';
            echo $statement;
            echo '</pre>';
        }
    }
}