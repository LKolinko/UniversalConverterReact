#include "core/Fraction.h"
#include "cpp-httplib/httplib.h"
#include <thread>
#include <memory>
#include <json/json.h>
#include <json/value.h>
using namespace httplib;

#define JSON_CONTENT "application/json"
#define JSON_RESPONSE(json) res.set_content(json.toStyledString(), "application/json")

std::string solve(std::string& str_whole, std::string& str_fractional, std::string& str_period, int p, int q) {
    std::string translate;
    BigInteger whole(str_whole, p);
    if (whole.GetErrors()) {
        return "error";
    }
    whole.translation(q);
    translate = out(translate, whole);
    if (!str_fractional.empty() || !str_period.empty()) {
        bool flag = true;
        if (str_fractional.empty()) {
            flag = false;
            str_fractional = "0";
        }
        BigInteger fractional(str_fractional, p);
        if (fractional.GetErrors()) {
            return "error";
        }
        std::string pw = "10";
        BigInteger den(pw, p);
        den.BinaryExponentiation((int)fractional.get_length());

        Fraction fr(fractional, den);
        if (!str_period.empty()) {
            pw = "10";
            BigInteger period(str_period, p);
            if (period.GetErrors()) {
                return "error";
            }
            BigInteger den_period(pw, p);

            den_period.BinaryExponentiation((int)period.get_length());
            std::string one = "1";
            BigInteger on(one, p);
            den_period -= on;


            if (flag) {
                std::reverse(pw.begin(), pw.end());
                BigInteger shift(pw, p);
                shift.BinaryExponentiation((int)fractional.get_length());
                den_period *= shift;
            }

            fr += Fraction(period, den_period);
        }
        fr.translation(q);
        if (!fr.carry) {
            translate += '.';
            std::vector<BigInteger> res = fr.get_decimal();
            for (int i = 0; i < res.size(); ++i) {
                if (i == fr.start) {
                    translate += '(';
                }
                translate = out(translate, res[i]);
                if (i == fr.finish - 1) {
                    translate += ')';
                }
            }
        } else {
            translate.clear();
            std::string str = "1";
            BigInteger one(str, whole.get_p());
            whole += one;
            translate = out(translate, whole);
        }
    }
    return translate;
}
// функция для button
std::string onclick(std::string number, std::string p, std::string q) {
    std::string str_whole, str_fractional, str_period;
    if (q.empty() || p.empty()) {
        std::string Null = "Null";
        return Null;
    }
    bool flag = false, period_f = false;
    for (char i : number) {
        if (i == ')') {
            break;
        }
        if (i == '(') {
            period_f = true;
        } else if (period_f) {
            str_period += i;
        } else if (i == '.' || i == ',') {
            flag = true;
        } else if (flag) {
            str_fractional += i;
        } else {
            str_whole += i;
        }
    }
    return solve(str_whole, str_fractional, str_period, std::stoi(p), std::stoi(q));
}

int main() {
    Server svr;

    svr.Get("/ping", [](const auto& req, auto& res) {
        Json::Value json;
        json["response"] = "OK";
        JSON_RESPONSE(json);
    });
    
    svr.Options("/api", [](const Request& req, Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Headers", "*");
        res.set_header("Access-Control-Fuck-Chrome", "kys");
    });

    svr.Post("/api", [](const auto& req, auto& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        Json::Value json;
        Json::Reader reader;

        reader.parse(req.body, json);

        if (json.empty()) {
            return;
        }

        std::vector<std::string> ans;
        for (auto u : json) {
            ans.push_back(u.asString());
        }

        std::string str = onclick(ans[2], ans[0], ans[1]);
        Json::Value json_response;
        json_response["answer"].append(str);
        JSON_RESPONSE(json_response);
    });     

    svr.listen("localhost", 1234);   
    
    return 0;
}
