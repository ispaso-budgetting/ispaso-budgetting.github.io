export default {
    template: `
      <legend>Income</legend>
      <label>Financial Aid: <input type = 'number' v-model='finAid' placeholder = '$xx,xxx.xx' /></label>

      <h4>Student Employment</h4>
      <label>Hourly wage
        <input type='number' placeholder='12.5' v-model='hourlyWage' />
      </label>

      <label>Projected Weekly Hours in session
        <input type='number' placeholder='20' max=20  v-model='sessionHours'/>
      </label>

      <h5>How will you work during the holidays</h5>

      <div v-for='h in holidayWork'>
        <h6>{{ h.name }}</h6>

        <label>
          How many hours per week will you be working on campus during {{h.name}}?
          <input class='block' type='number' v-model='h.hoursPerWeek' />
        </label>

        <label>
          How many weeks will you work on campus during {{h.name}}?
          <input class='block' type='number' v-model='h.weeksAvailable' />
        </label>
      </div>

      <h6>Other Income Sources</h6>
      <label v-for='(extra, i) in extraIncome' :key='i'>
        <input type='text' placeholder='Short description' v-model='extra.name' />
        <input type='number' placeholder='$x,xxx' v-model='extra.amount' />
        <input type='date' v-model='extra.date' />
        <button type='button' @click='extraIncome.splice(i, 1)'>Delete</button>
      </label>

      <button type='button' @click='addExtraIncome'>Add Extra Income</button>

      <p><button type='button' @click='showAdvancedIncome = !showAdvancedIncome'><span v-if='showAdvancedIncome'>Hide</span><span v-else>Show</span> Advanced</button></p>

      <fieldset v-if='showAdvancedIncome'>
        <legend>Advanced</legend>
        <label>Income Tax: <input type='number' v-model='incomeTax' /></label>
      </fieldset>
    `,

    data() {
        return {
            // INCOME
            finAid: null,
            hourlyWage: null,
            sessionHours: null,
            breakHours: null,
            holidayWork: {},
            extraIncome: null,
            extraExpenditure: null,
        }
    },

    mounted() {
    }
}
