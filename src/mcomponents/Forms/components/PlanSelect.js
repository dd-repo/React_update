import React, { Component } from 'react'
import infosweepApi from 'services/infosweepApi'
import ReduxFormSelect from './ReduxFormSelect'

const PLAN_REQUEST = 'admin/api/plans/search'

class PlanSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: { name: 'Loading', placeHolder: 'Loading ....', list: [] }
    }
  }

  componentWillMount () {
    infosweepApi.get(PLAN_REQUEST)
      .then ( res => this.setState({
        plans: this.formatPlan(res)
      }))
  }

  formatPlan = res => {
    const { plans } = res.data
    return {
      name: this.props.name,
      placeholder: 'Select a plan...',
      list: plans.map( plan => ({
        value: plan.is_type,
        label: `${plan.description} - $${plan.price}`
      }))
    }
  }

  render () {
    if (this.state.plans) {
      return <ReduxFormSelect field={this.state.plans} />
    } else {
      return <ReduxFormSelect field={this.state.loading} />
    }
  }
}

export default PlanSelect
