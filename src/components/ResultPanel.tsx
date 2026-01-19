import React from "react";

interface Props {
  message: string;
}
export const ResultPanel: React.FC<Props> = ({ message }) => (
  <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 rounded-lg font-medium text-slate-700 shadow-sm">
    {message}
  </div>
);
