import requests
import json
server_url = 'http://localhost:8080/api'


def tick(n=1):
    for _ in range(n):
        requests.post(server_url + '/tick')


def reset():
    requests.put(server_url + '/reset')


def book(source, destination, expected):
    data = {'source': source, 'destination': destination}
    head = {'Content-type': 'application/json', 'Accept': 'application/json'}
    response = requests.post(
        server_url + '/book',
        headers=head,
        data=json.dumps(data)
    )

    check_car(expected, json.loads(response.content))


def check_car(expected, actual):
    test_string = 'expected: {}, actual: {}'.format(expected, actual)
    errors = []

    if ('car_id' not in actual or 'total_time' not in actual):
        print('FAILED!!! - {} - car_id or total_time missing'.format(test_string))
        return

    if (actual['car_id'] != expected['car_id']):
        errors.append('wrong car_id')
    if (actual['total_time'] != expected['total_time']):
        errors.append('wrong total_time')

    if len(errors) > 0:
        print('FAILED!!! {} - reason: {}'.format(test_string, ', '.join(errors)))
    else:
        print('success - {}'.format(test_string))


if __name__ == '__main__':
    reset()
    book({'x': 1, 'y': 0}, {'x': 1, 'y': 1}, {'car_id': 1, 'total_time': 2})
    book({'x': 1, 'y': 1}, {'x': 5, 'y': 5}, {'car_id': 2, 'total_time': 10})
    tick()
    book({'x': -1, 'y': 1}, {'x': 5, 'y': 10}, {'car_id': 3, 'total_time': 17})
