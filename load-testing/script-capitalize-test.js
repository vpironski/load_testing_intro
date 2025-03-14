import http from 'k6/http';
import { check } from 'k6';

export const options = {
    scenarios: {
        shared_iter_scenario: {
            executor: "shared-iterations",
            vus: 10,
            iterations: 100,
            startTime: "0s",
        },
        per_vu_scenario: {
            executor: "per-vu-iterations",
            vus: 10,
            iterations: 10,
            startTime: "10s",
        },
    },
};

export default function () {
    const url = 'http://localhost:8080/capitalize'; // Change port if needed
    const payload = JSON.stringify({
        name: 'john doe',
        email: 'john@example.com',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, payload, params);

    check(res, {
        'is status 200': (r) => r.status === 200,
        'response has uppercase name': (r) => JSON.parse(r.body).name === 'JOHN DOE',
        'response has uppercase email': (r) => JSON.parse(r.body).email === 'JOHN@EXAMPLE.COM',
    });
}
