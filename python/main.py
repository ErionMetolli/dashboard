#!/usr/bin/python3
import psycopg2
import datetime
import random
import names
import sys
#import time


def main():
    # Database connection
    connProperties = "dbname='dashboard' user='postgres' host='localhost' password='erion123'"
    try:
        conn = psycopg2.connect(connProperties)
    except Exception as error:
        print(error)
        sys.exit()

    conn.autocommit = True
    cur = conn.cursor()

    for i in range(1, 1000): # Range of users
        '''
        firstName = names.get_first_name(gender='male')
        lastName = names.get_last_name()
        cardid = random.randint(1147000000, 2147000000)

        cur.execute("""INSERT INTO users(userid, name, surname, cardid) VALUES('""" + str(i) + """','""" + names.get_first_name(gender='male') + """', '""" + names.get_last_name() + """', '""" + str(cardid) + """')""")
        print("Done... " + str(i) + " " + firstName + " " + lastName)

        continue
        '''
        # Creating date 'OFFSET' and 'LIMIT'
        d1 = datetime.date(2017, 1, 1)
        d2 = datetime.date(2017, 2, 28)

        delta = d2 - d1

        for i in range(delta.days + 1):
            date = d1 + datetime.timedelta(i)

            amount = random.randint(200, 250)

            print("Starting date: " + str(date) + " amount: " + str(amount))
            for j in range(1, amount):
                starthours = random.randint(9, 20)
                startminutes = random.randint(0, 50)
                startseconds = random.randint(0, 50)

                endhours = random.randint(0, 2) + starthours
                endminutes = random.randint(startminutes, 59)
                endseconds = random.randint(startseconds, 59)

                startdate = str(date) + ' {0}:{1}:{2} '.format(starthours, startminutes, startseconds)
                enddate = str(date) + ' {0}:{1}:{2}'.format(endhours, endminutes, endseconds)

                user = random.randint(1, 106)
                statusRand = random.randint(1, 10) # Approx. 1 out of 10 will be Rejected
                status = random.randint(1, 2)
                description = "Gjithcka ne rregull"
                if statusRand == 1:
                    status = 3
                    description = "Nuk eshte kryer pagesa"
                    enddate = '\\N'

                print("UserID: " + str(user) + " status: " + str(status))
                print(str(amount - j) + " left")
                if status == 3:
                    cur.execute("""INSERT INTO entries(userid, description, startdate, statusid) VALUES('""" + str(user) + """', '""" + description + """', '""" + str(startdate) +  """', '""" + str(status) + """')""")
                else: 
                    cur.execute("""INSERT INTO entries(userid, description, startdate, enddate, statusid) VALUES('""" + str(user) + """', '""" + description + """', '""" + str(startdate) +  """', '""" + str(enddate) + """', '""" + str(status) + """')""")
        print("DONE, EXITING...")
        sys.exit()

if __name__ == '__main__':
    main()
