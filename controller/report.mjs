import pkg from "../models/mongooseModels/report.mjs";


export async function createReport(req,res){
    const reportData= req.body;
    try {
        const createReport= await pkg.Report.create(reportData)
        res.status(200).json(createReport)
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function getAllReports(req,res){
    try {
        const findReports = await pkg.Report.find();
        res.status(200).json(findReports);
      } catch (error) {
        res.status(500).json({ error });
        console.log(error)
      }  
}

export async function getPendingReports(req,res){
  try {
    const findPending= await pkg.Report.find({status:'pending'});
    res.status(200).json(findPending)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function getApprovedReports(req,res){
  try {
    const findApproved= await pkg.Report.find({status:'approved'});
    res.status(200).json(findApproved)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function getRejectedReports(req,res){
  try {
    const findRejected= await pkg.Report.find({status:'cancelled'});
    res.status(200).json(findRejected)
  } catch (error) {
    res.status(500).json({error})
  }
}

export async function updateReportStatus(req,res){
    const {id}= req.params;
    const data= req.body;
    try {
     const updateReport= await pkg.Report.findByIdAndUpdate(id,data,{new:true})
     res.status(200).json(updateReport) 
    } catch (error) {
      res.status(500).json({error})
    }
  }