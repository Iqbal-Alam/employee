import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  candidateTableHeader = ['id', 'Name', 'Department', 'Joining Date'];
  candidateList: any = [];
  candidateData: any = [];
  experiencedCandidateList: any = [];
  distinctCountList: any = [];
  constructor(private _cs: CandidateService) { }

  ngOnInit(): void {
    this.getCandidateList();
  }

  getCandidateList() {
    this._cs.getCandidateData().subscribe(
      res => {
        if (res) {
          this.candidateData = res;
          let uniqueArray = []
          this.candidateList = this.candidateData.filter(function (event) {
            return event.department != 'Development';
          });
          this.candidateList.map((data) => {
            var dateParts = data.joining_date.split("/");
            var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
            let joining_date = dateObject;
            let todayDate = new Date();

            var _m = todayDate.getMonth() - joining_date.getMonth();

            let yearDifference = (todayDate.getFullYear()) - joining_date.getFullYear()
              - ((_m < 0 || (_m === 0 && todayDate.getDate() < joining_date.getDate())) ? 1 : 0);

            if (Number(yearDifference) > 2) {
              this.experiencedCandidateList.push(data);
            }

            const distinctCount = this.candidateList
              .map(({ department }) => department)
              .reduce((names, department) => {
                const count = names[department] || 0;
                names[department] = count + 1;
                return names;
              }, {});
            Object.entries(distinctCount).forEach(([key, value]) => {
              uniqueArray.push({ 'department': key, 'count': value });
            });
            this.distinctCountList = uniqueArray.filter((v, i, a) => a.findIndex(t => (t.department === v.department)) === i)

          });
        }
      }
    );
  }

  sortBy(fieldName) {
    switch (fieldName) {
      case 'name_asc': {
        return this.candidateList.sort(function (a, b) {
          var x = a.name < b.name ? -1 : 1;
          return x;
        });
      }
      case 'name_dsc': {
        return this.candidateList.sort(function (a, b) {
          var x = a.name > b.name ? -1 : 1;
          return x;
        });
      }
      case 'joining_date_asc': {
        return this.candidateList.sort(function (a, b) {
          var aJoin = a.joining_date.split("/");
          var bJoin = b.joining_date.split("/");
          var aJoinObject = new Date(+aJoin[2], aJoin[1] - 1, +aJoin[0]);
          var bJoinObject = new Date(+bJoin[2], bJoin[1] - 1, +bJoin[0]);
          return Number(new Date(aJoinObject)) - Number(new Date(bJoinObject));
        });
      }
      case 'joining_date_dsc': {
        return this.candidateList.sort(function (a, b) {
          var aJoin = a.joining_date.split("/");
          var bJoin = b.joining_date.split("/");
          var aJoinObject = new Date(+aJoin[2], aJoin[1] - 1, +aJoin[0]);
          var bJoinObject = new Date(+bJoin[2], bJoin[1] - 1, +bJoin[0]);
          return Number(new Date(bJoinObject)) - Number(new Date(aJoinObject));
        });
      }
    }
  }

}
